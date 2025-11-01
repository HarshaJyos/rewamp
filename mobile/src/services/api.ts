import { getIdToken } from "firebase/auth";
import { auth } from "../config/firebase";
import { Platform } from "react-native";

class ApiService {
private get base() {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5001/syamapp-955e0/asia-south1';
  }
  return 'http://localhost:5001/syamapp-955e0/asia-south1';
}
  private async headers() {
    const user = auth.currentUser;
    if (!user) throw new Error("Unauthenticated");
    const token = await getIdToken(user);
    return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  }

  async createProfile(profile: any) {
    const h = await this.headers();
    const res = await fetch(`${this.base}/users`, { method: "POST", headers: h, body: JSON.stringify(profile) });
    return res.json();
  }

  async getProfile(uid: string) {
    const h = await this.headers();
    const res = await fetch(`${this.base}/users?uid=${uid}`, { headers: h });
    return res.json();
  }

  async updateProfile(uid: string, data: any) {
    const h = await this.headers();
    const res = await fetch(`${this.base}/users`, { method: "PUT", headers: h, body: JSON.stringify({ ...data, uid }) });
    return res.json();
  }

  async getCards() {
    const h = await this.headers();
    const res = await fetch(`${this.base}/cards`, { headers: h });
    return res.json();
  }

  async getRecommendations(uid: string) {
    const h = await this.headers();
    const res = await fetch(`${this.base}/recommendations?uid=${uid}`, { headers: h });
    return res.json();
  }

  async generateRecommendations(uid: string) {
    const h = await this.headers();
    const res = await fetch(`${this.base}/recommendations?uid=${uid}`, { method: "POST", headers: h });
    return res.json();
  }

  async createApplication(uid: string, cardId: string) {
    const h = await this.headers();
    const res = await fetch(`${this.base}/applications`, { method: "POST", headers: h, body: JSON.stringify({ creditCardId: cardId }) });
    return res.json();
  }

  async getApplications(uid: string) {
    const h = await this.headers();
    const res = await fetch(`${this.base}/applications?uid=${uid}`, { headers: h });
    return res.json();
  }

  async getNotifications(uid: string) {
    const h = await this.headers();
    const res = await fetch(`${this.base}/notifications?uid=${uid}`, { headers: h });
    return res.json();
  }

  async markNotificationRead(id: string) {
    const h = await this.headers();
    await fetch(`${this.base}/notifications`, { method: "PUT", headers: h, body: JSON.stringify({ id }) });
  }
}

export const apiService = new ApiService();