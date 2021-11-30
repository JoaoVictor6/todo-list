import { Auth, signInWithPopup } from "firebase/auth";
import { provider } from "./firebase";

interface CurrentUser {
  photoURL: string
  displayName: string
  email: string
}
export class AuthFirebase {
  private auth: Auth
  constructor(auth: Auth){
    this.auth = auth
  }

  async authentication():Promise<string> {
    if(this.auth.currentUser?.uid) {
      return this.auth.currentUser?.uid
    }
    const response = await signInWithPopup(this.auth, provider)
    return response.user.uid
  }

  get UserInfo(): CurrentUser{
    return this.auth.currentUser as CurrentUser
  }
}