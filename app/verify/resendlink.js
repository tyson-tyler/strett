import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase"; // your configured firebase auth

export const resendVerificationEmail = async () => {
  const user = auth.currentUser;

  if (user && !user.emailVerified) {
    try {
      await sendEmailVerification(user);
      return { success: true };
    } catch (error) {
      console.error("Resend failed:", error);
      return { error: "Something went wrong!" };
    }
  } else {
    return { error: "User is not signed in or already verified." };
  }
};
