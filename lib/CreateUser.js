import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export const CreateUser = async (email, password, imageUrl, username) => {
  try {
    const userCreatedials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCreatedials.user;

    await updateProfile(user, { displayName: username, photoURL: imageUrl });

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      username: username,
      email: email,
      photoURL: imageUrl,
      Videos: [],
      Likes: [],
      followers: [],
      following: [],
      comment: [],
      history: [],
      Views: 0,
      uid: user.uid,
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const SignWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const existingUser = await getDoc(userRef);

    if (existingUser.exists()) {
      toast("Welcome back!");
    } else {
      await setDoc(userRef, {
        username: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        Videos: [],
        Likes: [],
        followers: [],
        following: [],
        comment: [],
        history: [],
        Views: 0,
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });
      toast.success("Account created successfully!");
    }

    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    toast.error("Something went wrong during Google Sign-In.");
  }
};
