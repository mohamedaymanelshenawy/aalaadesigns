"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Shoppingbag from "@/components/svgs/Shoppingbag";
import { useCart } from "@/app/contexts/CartContext";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_path: string;
}

interface ProductCardProps extends Product {
  link: string;
}

export interface CartItem extends Product {
  count: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image_path,
  link,
}: ProductCardProps) {
  const { cart, setCart } = useCart();
  const [isCarted, setIsCarted] = useState<boolean>(false);

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

  const addToCart = async () => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, price }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      setCart((prevCart: Cart) => ({
        ...prevCart,
        items: [
          ...(prevCart?.items || []),
          { id, name, price, count: 1, image_path },
        ],
      }));

      setIsCarted(true);

      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (error) {}
  };

  const removeFromCart = async () => {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
      }

      setCart((prevCart: Cart) => ({
        ...prevCart,
        items:
          prevCart?.items?.filter((item: CartItem) => item.id !== id) || [],
      }));

      setIsCarted(false);

      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (error) {}
  };

  const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCarted) {
      removeFromCart();
    } else {
      addToCart();
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg h-[400px] flex flex-col">
      <Link className="flex-grow" href={link}>
        <CardContent className="p-0 h-full flex flex-col">
          <div className="h-[80%] relative">
            <Image
              alt={name}
              className="w-full"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              src={image_path}
            />
          </div>
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="font-bold">{price.toFixed(2)} EGP</p>
              <Button
                aria-label={isCarted ? "Remove from cart" : "Add to cart"}
                className="flex items-center justify-center"
                size="icon"
                onClick={handleCartClick}
              >
                <Shoppingbag IsInCart={isCarted} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
