"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertCircle, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import CartItem from "@/components/cartitem";
import { useUser } from "@/app/contexts/UserContext";

type CartItem = {
  id: number;
  product_name: string;
  price: number;
  stock: number;
  material: string;
  createdat: string;
  categoryid: number;
  image_path: string;
  description: string;
  subcategoryid: number;
  count: number;
};

type Cart = {
  id: number;
  items: CartItem[];
};

export default function Cart() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    async function fetchCartItems() {
      if (!user || !user.id) {
        setError("User not found");
        setIsLoading(false);

        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/cart?userId=${user.id}`, {
          method: "GET",
          redirect: "follow",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const result = await response.json();

        setCart(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCartItems();
  }, [user]);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (cart) {
      const updatedItems = cart.items.map((item) =>
        item.id === itemId ? { ...item, count: newQuantity } : item
      );

      setCart({ ...cart, items: updatedItems });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-16 h-16 text-black animate-spin" />
        <p className="mt-4 text-xl font-semibold text-white animate-pulse">
          Loading your cart...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-yellow-500">
        <AlertCircle className="w-16 h-16 text-white" />
        <p className="mt-4 text-xl font-semibold text-white">Oops! {error}</p>
        <Button className="mt-4 bg-white text-red-500 hover:bg-red-100">
          Try Again
        </Button>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
        <ShoppingCart className="w-16 h-16 text-white" />
        <p className="mt-4 text-xl font-semibold text-white">
          Your cart is empty
        </p>
        <Button className="mt-4 bg-white text-blue-500 hover:bg-blue-100">
          Start Shopping
        </Button>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
  const shipping = 30; // Assuming flat rate shipping
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 mt-0">CART</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4 border-b border-gray-200">
            <span className="font-semibold">Product</span>
            <span className="font-semibold">Quantity</span>
            <span className="font-semibold">Subtotal</span>
          </div>
          {cart.items.map((item) => (
            <CartItem
              key={item.id}
              color="default"
              imageSrc="shirt.png"
              name={item.product_name}
              price={`${item.price} EGP`}
              quantity={item.count}
              size="default"
              onDecrement={() =>
                handleQuantityChange(item.id, Math.max(item.count - 1, 1))
              }
              onIncrement={() => handleQuantityChange(item.id, item.count + 1)}
              onQuantityChange={(e) => {
                const value = parseInt(e.target.value);

                if (!isNaN(value) && value >= 1 && value <= 99) {
                  handleQuantityChange(item.id, value);
                }
              }}
            />
          ))}
        </div>
        <div className="md:col-span-1">
          <div className="p-6 rounded-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} EGP</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="text-sm">Flat rate: {shipping} EGP</span>
              </div>
              <div className="flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>{total.toFixed(2)} EGP</span>
              </div>
              <Button className="w-full">CHECKOUT</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
