"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard } from "lucide-react";

import AnimatedShoppingBag from "./svgs/AnimatedShoppingBag";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/contexts/CartContext";
import { addToCart, removeFromCart } from "@/app/util/utils";
import { useUser } from "@/app/contexts/UserContext";
import { Cart, CartItem, Product } from "@/app/types/types";

interface ProductCardProps extends Product {
  link: string;
  layoutView?: "grid" | "list";
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image_path,
  link,
  layoutView = "grid",
}: ProductCardProps) {
  const { cart, setCart } = useCart();
  const [isCarted, setIsCarted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    const checkIfInCart = () => {
      const productInCart = cart?.items?.some(
        (item: CartItem) => item.id === id
      );

      setIsCarted(!!productInCart);
    };

    checkIfInCart();

    const handleCartUpdate = () => checkIfInCart();

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [cart, id]);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      //set delay to 1 second
      //await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await addToCart({
        productId: id,
        count: 1,
        user: user,
      });

      if (response && response.status === 200) {
        setIsCarted(true);
        setCart((prevCart: Cart) => ({
          ...prevCart,
          items: [
            ...(prevCart?.items || []),
            { id, name, price, image_path, count: 1 },
          ],
        }));
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    setIsLoading(true);
    try {
      const response = await removeFromCart({
        productId: id,
        count: 1,
        user: user,
      });

      if (response && response.status === 200) {
        setIsCarted(false);
        setCart((prevCart: Cart) => ({
          ...prevCart,
          items: prevCart.items.filter((item) => item.id !== id),
        }));
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleCartClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCarted) {
      await handleRemoveFromCart();
    } else {
      await handleAddToCart();
    }
  };

  const handleCheckoutNow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isCarted) {
      await handleAddToCart();
    }
    // Redirect to checkout
    window.location.href = "/checkout";
  };

  return (
    <Card
      className={`
        group overflow-hidden transition-all hover:shadow-lg bg-white
        ${layoutView === "grid" ? "h-[520px] flex flex-col rounded-3xl" : "flex h-[250px] rounded-3xl"}
      `}
    >
      <Link
        className={`
          ${layoutView === "grid" ? "flex-grow" : layoutView === "list" ? "w-[100%] relative" : ""}
        `}
        href={link}
      >
        <CardContent
          className={`
            p-0 h-full 
            ${layoutView === "grid" ? "flex flex-col" : "flex"}
          `}
        >
          <div
            className={`
              relative overflow-hidden
              ${layoutView === "grid" ? "h-[340px]" : "h-full w-[50%]"}
            `}
          >
            <Image
              alt={name}
              className={`
                w-full transition-transform duration-500 group-hover:scale-105
                ${layoutView === "list" ? "h-[300px] rounded-l-3xl object-cover" : "rounded-t-3xl"}
              `}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              src="/shirt.png"
            />
            <div className="absolute top-3 right-3 bg-[#FF3B30] text-white text-xs font-medium px-2 py-0.5 rounded-full">
              New
            </div>
          </div>

          <div
            className={`
              p-4 flex flex-col justify-between
              ${layoutView === "list" ? "w-[60%]" : "flex-grow"}
            `}
          >
            <div>
              <h3 className="font-medium text-[15px] text-gray-900">{name}</h3>
              {description && layoutView === "list" && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            <div
              className={`
              ${layoutView === "grid" ? "mt-auto space-y-2" : "flex items-center gap-2 mt-auto"}
            `}
            >
              <div
                className={`flex justify-between items-center ${layoutView === "list" ? "mb-0" : "mb-2"}`}
              >
                <p className="font-semibold text-[15px] text-gray-900">
                  {price.toFixed(2)} <span className="text-sm">EGP</span>
                </p>
              </div>

              <div
                className={`${layoutView === "list" ? "flex gap-2 flex-1" : "space-y-2"}`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={
                      isLoading ? "loading" : isCarted ? "carted" : "not-carted"
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    className={layoutView === "list" ? "flex-1" : "w-full"}
                    exit={{ opacity: 0, scale: 0.8 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      aria-label={isCarted ? "Remove from cart" : "Add to cart"}
                      className={`
                        flex items-center justify-center h-9 w-full
                        text-xs font-medium px-4 rounded-full bg-white border border-gray-200 
                        hover:bg-gray-50 hover:border-gray-300 transition-all duration-300
                      `}
                      disabled={isLoading}
                      onClick={handleCartClick}
                    >
                      <AnimatedShoppingBag
                        isAdding={true}
                        isInCart={isCarted}
                        isLoading={isLoading}
                      />
                      <span className="ml-2">
                        {isCarted ? "Remove from Cart" : "Add to Cart"}
                      </span>
                    </Button>
                  </motion.div>
                </AnimatePresence>

                {/* Checkout Now Button */}
                <button
                  className={`
                    text-xs font-medium h-9 px-4 rounded-full bg-black text-white
                    hover:bg-gray-900 transition-all duration-300 flex items-center justify-center w-full
                  `}
                  onClick={handleCheckoutNow}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
