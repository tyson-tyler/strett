"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/firebase";
import ResendButton from "./ResendButton";

export default function VerifyPage() {
  const [message, setMessage] = useState("Verifying...");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState("");
  useEffect(() => {
    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");

    if (mode === "verifyEmail" && oobCode) {
      applyActionCode(auth, oobCode)
        .then(() => {
          setMessage("✅ Email verified successfully!");
          setTimeout(() => router.push("/login"), 3000); // redirect after 3s
        })
        .catch((error) => {
          console.error(error);
          setError("❌ Verification link is invalid or expired.");
        });
    } else {
      setError("❌ Invalid verification link.");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center text-xl font-medium">{message}</div>

      {error && (
        <div className="flex flex-col">
          {error} <ResendButton />
        </div>
      )}
    </div>
  );
}
