// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  TIMEOUT: 10000,
};

// API Endpoints - สำหรับ static URLs
export const API_ENDPOINTS = {
  // Vending Machine endpoints
  PRODUCTS: "/products",
  PURCHASE: "/purchase",
  DENOMINATIONS: "/cash/denominations",
  ORDERS: "/orders",
  DEPOSIT: "/orders/deposit",
};

// API Endpoint Builders - สำหรับ dynamic URLs
export const buildEndpoint = {
  // Order endpoints with dynamic params
  orderById: (orderId: string) => `/orders/${orderId}`,
  selectProduct: (orderId: string) => `/orders/${orderId}/select-product`,
  cancelOrder: (orderId: string) => `/orders/${orderId}/cancel`,
  purchaseOrder: (orderId: string) => `/orders/${orderId}/purchase`,
};
