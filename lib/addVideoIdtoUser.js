import { db } from "@/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export const AddtoVideoId = async (userId, videoId) => {
  try {
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      Videos: arrayUnion(videoId),
    });
    console.log("Added SuccessFully");
  } catch (error) {
    console.log(error);
  }
};
