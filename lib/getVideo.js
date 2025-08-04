import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export const GetVideo = async () => {
  try {
    const querysnap = await getDocs(collection(db, "videos"));
    const video = querysnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return video;
  } catch (error) {
    console.log(error);
  }
};
