import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { CreateNewUser } from "../../../inngest/functions";
import { GenerateNotes } from "../../../inngest/functions";
import { GenerateStudyTypeContent } from "../../../inngest/functions";

// Create an API that serves your functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [CreateNewUser, GenerateNotes, GenerateStudyTypeContent],
});
