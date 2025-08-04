import { db } from "@/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export const CreateVideoNow = async (
  title,
  desc,
  thumbnail,
  videoSrc,
  userId
) => {
  const postref = doc(collection(db, "videos"));
  const postId = postref.id;

  await setDoc(postref, {
    userId,
    postId,
    title,
    desc,
    thumbnail,
    videoSrc,
    Likes: [],
    Views: 0,
    comment: [],
    createdAt: new Date().toISOString(),
  });
  return { postId };
};
