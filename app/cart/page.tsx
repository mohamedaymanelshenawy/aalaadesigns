/* eslint-disable no-console */
"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { House } from "lucide-react";

import { useCart } from "@/app/contexts/CartContext";
import { useUser } from "@/app/contexts/UserContext";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cartitem";
import EmptyCart from "@/components/emptycart";

export default function CartPage() {
  //const { Cart } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cart, setCart } = useCart();

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const handleCheckout = () => {
    router.push("/checkout");
  };
  const goToHomePage = () => {
    router.push("../");
  };

  async function fetchCartItems() {
    if (!user || !user.id) {
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
      try {
        if (!cart) {
          throw new Error();
        } else {
          setError(null);
        }
      } catch (er) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (cart && cart.items) {
      const updatedItems = cart.items.map((item) =>
        item.id === itemId ? { ...item, count: newQuantity } : item
      );

      setCart({ ...cart, items: updatedItems });

      try {
        const response = await fetch(`/api/cart/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.id,
            itemId,
            quantity: newQuantity,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update cart item quantity");
        }
      } catch (err) {
        console.error("Error updating cart item quantity:", err);
        // Optionally, revert the local state change or show an error message to the user
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-16 h-16 text-black animate-spin" />
        <p className="mt-4 text-xl font-semibold text-gray-800 animate-pulse">
          Loading your cart...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r">
        <AlertCircle className="w-16 h-16 text-white" />
        <p className="mt-4 text-xl font-semibold text-black">
          Your Cart is empty!
        </p>
        <Button
          className="mt-4 bg-white border-1 border-b rounded text-black hover:bg-gray-100"
          onClick={goToHomePage}
        >
          <House className="mr-5" />
          Home
        </Button>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return <EmptyCart />;
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
          <AnimatePresence>
            {cart.items.map((item) => (
              <motion.div
                key={item.id}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <CartItem
                  color={item.selectedColor || "default"}
                  imageSrc={"/shirt.png"}
                  name={item.name}
                  price={`${item.price} EGP`}
                  quantity={item.count}
                  size={item.selectedSize || "default"}
                  onDecrement={() =>
                    handleQuantityChange(item.id, Math.max(item.count - 1, 1))
                  }
                  onIncrement={() =>
                    handleQuantityChange(item.id, item.count + 1)
                  }
                  onQuantityChange={(e) => {
                    const value = parseInt(e.target.value);

                    if (!isNaN(value) && value >= 1 && value <= 99) {
                      handleQuantityChange(item.id, value);
                    }
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
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
              <Button className="w-full" onClick={handleCheckout}>
                CHECKOUT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
