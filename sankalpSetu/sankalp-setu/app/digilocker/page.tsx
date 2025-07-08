"use client"
import { useRouter } from "next/navigation";
const security = "authentication with google"
export default function DigiLockerIntegrationPage() {
  const router = useRouter();
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-purple-50/20 dark:to-purple-950/20 py-8">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="border rounded-xl border-purple-200/50 dark:border-purple-800/50 bg-background p-8 text-center space-y-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">{security }</h1>
          <div className="text-lg mb-4">Securely connect your DigiLocker account to access your government documents instantly.</div>
          <button
            className="w-full py-2 rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold mb-4 hover:from-purple-700 hover:to-pink-700 transition"
            onClick={() => router.push("/digilocker/custom-form")}
          >
            Login with DigiLocker
          </button>
          <div className="text-sm text-muted-foreground text-center mb-2">
            <b>Privacy First:</b> Your data stays secure within the app with no third-party sharing.
          </div>
          <div className="mt-4 text-left">
            <h3 className="font-semibold mb-2">How it works:</h3>
            <ol className="list-decimal list-inside text-sm space-y-1">
              {/* <li>User clicks Login with Google</li> */}
              <li>Redirect to DigiLocker Authorization URL</li>
              <li>User logs in and gives permission</li>
              <li>DigiLocker redirects back to your site with a code</li>
              <li>You exchange code for an access token</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
} 