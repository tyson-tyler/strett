import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getProfile = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      console.log("No USER Found");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
