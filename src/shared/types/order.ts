export interface CreateOrderResponse {
  orderId: string;
}

export interface SelectProductResponse {
  success: boolean;
  orderId: string;
  productId: string;
}

export interface CancelOrderRequest {
  orderId: string;
}

export interface CancelOrderResponse {
  success: boolean;
  orderId: string;
  refundAmount: number;
}

export interface DepositCashRequest {
  orderId?: string;
  denominationId: string;
  qty: number;
}

export interface DepositCashResponse {
  success: boolean;
  orderId: string;
  depositAmount: number;
  totalAmount: number;
}

export interface PurchaseResponse {
  success: boolean;
  orderId: string;
  changeAmount: number;
  change: ChangeDetailDto[];
}

export interface ChangeDetailDto {
  amount: number;
  quantity: number;
}
