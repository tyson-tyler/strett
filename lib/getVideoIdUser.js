import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getVideoById = async (videoId) => {
  const video = await Promise.all(
    videoId.map(async (id) => {
      if (!id) {
        return null;
      }
      const docRef = doc(db, "videos", id);
      const snap = await getDoc(docRef);

      return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    })
  );

  return video.filter((v) => v !== null);
};
