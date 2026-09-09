import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Provider from "./provider";

export const metadata = {
  title: "TutorAI - AI-Powered Learning Platform",
  description: "Create personalized study materials with AI-generated notes, flashcards, quizzes, and Q&A. Your intelligent learning companion.",
};

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] });

const configuredClerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
const clerkPublishableKey = /^pk_(test|live)_[A-Za-z0-9_-]+$/.test(configuredClerkKey || "")
  ? configuredClerkKey
  : undefined;

export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#7c3aed',
          colorBackground: '#161822',
          colorInputBackground: '#1e2030',
          colorText: '#e8eaed',
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
