import { db } from "@/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

export const getUserById = async(userId) => {
    const docRef = doc(db, "users", userId)
    const docsnap = await getDoc(docRef)
    
    
    if(docsnap.exists()){
        return docsnap.data()
    }else{
        console.log("Doc is not Found")
        return null
    }
}