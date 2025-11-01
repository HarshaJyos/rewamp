import {
  signInAnonymously,
  onAuthStateChanged,
  User,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import * as SecureStore from "expo-secure-store";

class FirebaseAuthService {
  async signInAnonymously() {
    return await signInAnonymously(auth);
  }

  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  async signOut() {
    await signOut(auth);
  }

  async savePushToken(token: string) {
    const user = this.getCurrentUser();
    if (user) {
      await SecureStore.setItemAsync(`pushToken_${user.uid}`, token);
    }
  }

  async getPushToken(): Promise<string | null> {
    const user = this.getCurrentUser();
    if (user) {
      return await SecureStore.getItemAsync(`pushToken_${user.uid}`);
    }
    return null;
  }
}

export const firebaseAuthService = new FirebaseAuthService();