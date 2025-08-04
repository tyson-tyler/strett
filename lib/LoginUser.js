import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const LoginUser = async (email, password) => {
  try {
    const userCredital = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredital.user;
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    return 400;
  }
};
