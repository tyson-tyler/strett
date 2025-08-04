import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getVideoById = async (videoId) => {
  const docRef = doc(db, "videos", videoId);
  const videoDoc = await getDoc(docRef);

  if (videoDoc.exists()) {
    return videoDoc.data();
  } else {
    console.log("Video is Not Found");
    return null;
  }
};
