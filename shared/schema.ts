export type CreditScore = "poor" | "fair" | "good" | "very good" | "excellent";
export type SpendingCategory = "travel" | "dining" | "groceries" | "general" | "shopping";

export interface UserProfile {
  userId: string;
  annualIncome?: number;
  creditScore?: CreditScore;
  primarySpendingCategory?: SpendingCategory;
  monthlySpending?: number;
  pushToken?: string;
}

export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  rewardRate: string;
  signupBonus: string;
  benefits: string[];
  category: SpendingCategory;
}

export interface Recommendation {
  id: string;
  creditCard: CreditCard;
  matchScore: number;
}

export interface Application {
  id: string;
  creditCard: CreditCard;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}