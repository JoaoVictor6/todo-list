import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

export default async function AuthFirebase() {
  if(auth.currentUser?.uid) {
    return auth.currentUser?.uid
  }
  const response = await signInWithPopup(auth, provider)
  return response.user.uid
}