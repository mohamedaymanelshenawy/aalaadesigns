export type User = {
  email: string;
  id: number;
  username: string;
  role: string;
} | null;
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_path: string;
}

export interface CartItem extends Product {
  count: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
}

export type CartState = Cart | null;
