import axiosInstance from "./axios-instance";
import { API_ENDPOINTS, buildEndpoint } from "../shared/config/vending-config";
import type { Product, ProductAndStock } from "../shared/types/products";
import type { Denominations } from "../shared/types/denominations";
import type {
  CancelOrderResponse,
  CreateOrderResponse,
  DepositCashRequest,
  DepositCashResponse,
  PurchaseResponse,
  SelectProductResponse,
} from "../shared/types/order";

// Backend Response Wrapper
interface BackendResponse<T> {
  statusCode: number;
  data: T;
}

// Vending Service
const vendingService = {
  // Get all products
  getProducts: async (): Promise<ProductAndStock[]> => {
    try {
      const response = await axiosInstance.get<
        BackendResponse<ProductAndStock[]>
      >(API_ENDPOINTS.PRODUCTS);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Get single product by ID
  getProductById: async (id: string | number): Promise<Product> => {
    try {
      const response = await axiosInstance.get<BackendResponse<Product>>(
        `${API_ENDPOINTS.PRODUCTS}/${id}`,
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  // Get denominations
  getDenominations: async (): Promise<Denominations[]> => {
    try {
      const response = await axiosInstance.get<
        BackendResponse<Denominations[]>
      >(`${API_ENDPOINTS.DENOMINATIONS}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching denominations:", error);
      throw error;
    }
  },

  // Create new order
  createOrder: async (): Promise<CreateOrderResponse> => {
    try {
      const response = await axiosInstance.post<
        BackendResponse<CreateOrderResponse>
      >(API_ENDPOINTS.ORDERS);
      return response.data.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Cancel order
  cancelOrder: async (orderId: string): Promise<CancelOrderResponse> => {
    try {
      const response = await axiosInstance.post<
        BackendResponse<CancelOrderResponse>
      >(buildEndpoint.cancelOrder(orderId));
      return response.data.data;
    } catch (error) {
      console.error("Error cancelling order:", error);
      throw error;
    }
  },

  // Deposit cash for order
  depositCash: async (
    request: DepositCashRequest,
  ): Promise<DepositCashResponse> => {
    try {
      const response = await axiosInstance.post<
        BackendResponse<DepositCashResponse>
      >(API_ENDPOINTS.DEPOSIT, { ...request });
      return response.data.data;
    } catch (error) {
      console.error("Error depositing cash:", error);
      throw error;
    }
  },

  // Select product for order
  selectProduct: async (
    orderId: string,
    productId: string,
  ): Promise<SelectProductResponse> => {
    try {
      const response = await axiosInstance.post<
        BackendResponse<SelectProductResponse>
      >(buildEndpoint.selectProduct(orderId), { productId });
      return response.data.data;
    } catch (error) {
      console.error("Error selecting product:", error);
      throw error;
    }
  },

  // Purchase order
  purchaseOrder: async (orderId: string): Promise<PurchaseResponse> => {
    try {
      const response = await axiosInstance.post<
        BackendResponse<PurchaseResponse>
      >(buildEndpoint.purchaseOrder(orderId), { orderId });
      return response.data.data;
    } catch (error) {
      console.error("Error purchasing order:", error);
      throw error;
    }
  },
};

export default vendingService;
