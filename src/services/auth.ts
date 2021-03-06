import { Auth, signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

interface CurrentUser {
  photoURL: string
  displayName: string
  email: string
  uuid?: string
}
class AuthFirebase {
  private auth: Auth
  constructor(auth: Auth){
    this.auth = auth
  }

  async authentication():Promise<string | undefined> {
    if(this.auth.currentUser?.uid) {
      return this.auth.currentUser?.uid
    }
    const response = await signInWithPopup(this.auth, provider)
    return response.user.uid
  }
  async googleSignout(){
    await auth.signOut()
  }
  get UserInfo(): CurrentUser{
    return this.auth.currentUser as CurrentUser
  }
}

export default new AuthFirebase(auth)