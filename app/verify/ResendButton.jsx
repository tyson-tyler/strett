"use client";
import { useState } from "react";
import { resendVerificationEmail } from "./resendlink"; // path to above function

export default function ResendButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    setLoading(true);
    const result = await resendVerificationEmail();
    if (result.success) {
      setMessage("Verification email sent ✅");
    } else {
      setMessage(result.error || "Failed to send verification email ❌");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleResend}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Sending..." : "Resend Verification Email"}
      </button>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
}
