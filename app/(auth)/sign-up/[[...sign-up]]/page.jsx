import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  const hostedSignIn = "https://closing-condor-65.accounts.dev/sign-in#/?sign_in_fallback_redirect_url=http%3A%2F%2Flocalhost%3A3001%2F&sign_up_fallback_redirect_url=http%3A%2F%2Flocalhost%3A3001%2F";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="max-w-xl w-full mb-6 bg-yellow-50 border border-yellow-200 text-yellow-900 p-4 rounded">
        <h3 className="font-semibold">Phone numbers from India are not supported</h3>
        <p className="text-sm">If you are in India (+91), use email sign-up instead. You can use the hosted Clerk sign-in page or create a test user in your Clerk dashboard.</p>
        <div className="mt-3 flex gap-3">
          <a href={hostedSignIn} className="inline-block bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">Open Clerk hosted sign-in</a>
          <Link href="/" className="inline-block px-3 py-1 border rounded">Back to home</Link>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <SignUp />
      </div>
    </div>
  );
}
