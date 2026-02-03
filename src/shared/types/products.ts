export interface Product {
  id: string | number;
  name: string;
  price: number;
}

export interface ProductAndStock {
  id: string;
  name: string;
  price: number;
  sku: string;
  isActive: boolean;
  productStock: ProductStock;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface ProductStock {
  id: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
