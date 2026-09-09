import { CHAPTER_NOTES_TABLE } from "../../../configs/schema";
import { db } from "../../../configs/db";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { STUDY_TYPE_CONTENT_TABLE } from "../../../configs/schema";

// Helper function to retry database operations
async function retryDbOperation(operation, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.log(`Database operation failed, retrying... (${i + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
}

export async function POST(req) {
  try {
    const { courseId, studyType } = await req.json();

    // Validate input
    if (!courseId) {
      return NextResponse.json(
        { error: "The 'courseId' field is required." },
        { status: 400 }
      );
    }

    // Handling "ALL" case
    if (studyType === "ALL") {
      const notes = await retryDbOperation(() => 
        db.select()
          .from(CHAPTER_NOTES_TABLE)
          .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId))
      );

      const contentList = await retryDbOperation(() =>
        db.select()
          .from(STUDY_TYPE_CONTENT_TABLE)
          .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId))
      );

      const result = {
        notes: notes || [],
        flashcard: (contentList || []).filter((item) => item.type === "Flashcard"),
        quiz: (contentList || []).filter((item) => item.type === "Quiz"),
        qa: (contentList || []).filter((item) => item.type === "Question/Answer"),
      };

      return NextResponse.json(result);
    }

    // Handling specific study types
    else if (studyType === "notes") {
      const notes = await retryDbOperation(() =>
        db.select()
          .from(CHAPTER_NOTES_TABLE)
          .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId))
      );

      return NextResponse.json(notes || []);
    } else {
      const result = await retryDbOperation(() =>
        db.select()
          .from(STUDY_TYPE_CONTENT_TABLE)
          .where(
            and(
              eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
              eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
            )
          )
      );

      return NextResponse.json(result[0] || null);
    }
  } catch (error) {
    console.error("Error in POST /api/study-type:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch study materials. Please try again later." },
      { status: 500 }
    );
  }
}
