/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Shoppingbag from "@/components/svgs/Shoppingbag";

interface ProductCardProps {
  id: number;
  name: string;
  description?: string;
  price: string;
  isInCart: boolean;
  image_path: string;
  link: string;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  isInCart = false,
  image_path,
  link,
}: ProductCardProps) {
  const [isCarted, setIsCarted] = useState(false);

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

      const result = await response.json();

      // You could update some state here to show a success message or update the cart count
    } catch (error) {
      // You could update some state here to show an error message
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCarted(!isCarted);
    addToCart();
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
              src="/shirt.png"
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
              <p className="font-bold">{price} EGP</p>
              <Button
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
