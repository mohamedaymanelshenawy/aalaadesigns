"use client";
//import  from "next/image";
import { useState } from "react";
import { Image } from "@nextui-org/react";
import { useTheme } from "next-themes";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);
  const { theme } = useTheme();
  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (!isNaN(value) && value >= 1 && value <= 99) {
      setQuantity(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 mt-0">CART</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Product</span>
            <span className="font-semibold">Quantity</span>
            <span className="font-semibold">Subtotal</span>
          </div>
          <div className="border-t border-gray-200 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  alt="Basic colored Dress"
                  className="rounded"
                  height={80}
                  src="/shirt.png"
                  width={80}
                />
                <div>
                  <h3 className="font-semibold">Basic colored Dress</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-4 h-4 rounded-full bg-pink-500" />
                    <span className="text-sm">L</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <Button
                    className={`pt-1  text-xl rounded-full text-center hover:bg-opacity-80 ${theme === "light" ? "border-white" : "border-red-800"}`}
                    variant="outline"
                    onClick={decrementQuantity}
                  >
                    -
                  </Button>
                  <Input
                    className={`w-14 rounded-full text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${theme === "light" ? "border-black" : "border-red-800"}`}
                    max="99"
                    min="1"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <Button
                    className={`  text-xl rounded-full text-center hover:bg-opacity-80 ${theme === "light" ? "border-white" : "border-red-800"}`}
                    variant="outline"
                    onClick={incrementQuantity}
                  >
                    <p>+ </p>
                  </Button>
                </div>
              </div>
              <span className="font-semibold">550 EGP</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className=" p-6 rounded-sm ">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span>550 EGP</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="text-sm">Flat rate</span>
              </div>
              <div className="flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>550 EGP</span>
              </div>

              <Button className="w-full">CHECKOUT</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
