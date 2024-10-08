import React from "react";
import { Card, Button } from "@nextui-org/react";

import HeartIcon from "@/components/svgs/Heart";
import Shoppingbag from "@/components/svgs/Shoppingbag";

interface CategoryCardProps {
  name: string;
  description?: string;
  price?: string;
  isLiked: boolean;
  isInCart: boolean;
  image_path: string;
}

function ProductCard({
  name,
  description,
  price,
  isLiked = false,
  isInCart = false,
  image_path,
}: CategoryCardProps) {
  //const addToCart = async () => {
  //  try {
  //    const response = await fetch("/api/cart/add", {
  //      method: "POST",
  //      headers: {
  //        "Content-Type": "application/json",
  //      },
  //      body: JSON.stringify({ id, name, price }),
  //    });

  //    if (!response.ok) {
  //      throw new Error("Failed to add product to cart");
  //    }

  //    const result = await response.json();
  //    console.log(result.message);
  //    // You could update some state here to show a success message or update the cart count
  //  } catch (error) {
  //    console.error("Error adding product to cart:", error);
  //    // You could update some state here to show an error message
  //  }
  //};

  return (
    <>
      <Card
        disableRipple
        isHoverable
        className="w-[20rem] h-[32rem] flex flex-col bg-white bg-opacity-none  justify-center bg-cover bg-center hover:shadow-xl hover:scale-[1.01] transform transition-transform duration-300"
        style={{
          backgroundImage: "url('/shirt.png')",
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
          <div className="absolute bottom-0 left-0 right-0 p-2 rounded-md text-black w-11/12 text-left m-auto z-20 ">
            <p className="text-lg  text-white">{name}</p>
            <p className="text-md font-extralight text-white">{description}</p>
            <p className="text-xl font-bold text-white">{price} EGP</p>
          </div>
          <div className="absolute top-3 right-1 p-2 rounded-md w-11/12 text-right text-white m-auto z-20 mt-auto">
            <Button
              isIconOnly
              className="text-red-500 p-1 hover:bg-none scale-[1.35]"
              variant="light"
            >
              <HeartIcon IsLiked={isLiked} />
            </Button>
          </div>
          <div className="absolute bottom-3 right-0 py-2 rounded-md w-11/12 text-right text-white m-auto z-20 mt-auto">
            <Button className="text-white" variant="light">
              <Shoppingbag IsInCart={isInCart} />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ProductCard;
