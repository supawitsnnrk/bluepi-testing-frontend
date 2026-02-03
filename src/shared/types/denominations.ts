export interface Denominations {
  id: string;
  type: DenominationType;
  amount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type DenominationType =
  (typeof DenominationType)[keyof typeof DenominationType];

export const DenominationType = {
  COIN: "COIN",
  BILL: "BILL",
} as const;
