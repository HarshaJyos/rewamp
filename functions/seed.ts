import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

const cards = [
  { name: "Chase Sapphire Preferred", issuer: "Chase", annualFee: 95, rewardRate: "2x travel/dining", signupBonus: "60k pts", benefits: ["No FX", "Travel insurance"], category: "travel" },
  { name: "Amex Gold", issuer: "Amex", annualFee: 250, rewardRate: "4x dining/groceries", signupBonus: "60k pts", benefits: ["Dining credits"], category: "dining" },
  { name: "Citi Double Cash", issuer: "Citi", annualFee: 0, rewardRate: "2% cashback", signupBonus: "$200", benefits: ["No annual fee"], category: "general" },
];

async function seed() {
  const batch = db.batch();
  cards.forEach(c => {
    const ref = db.collection("cards").doc();
    batch.set(ref, c);
  });
  await batch.commit();
  console.log("Seeded cards");
}
seed();