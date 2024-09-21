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
}

function ProductCard({
  name,
  description,
  price,
  //isLiked = false,
  //isInCart = false,
}: CategoryCardProps) {
  return (
    <>
      <Card
        disableRipple
        isHoverable
        className="w-[20rem] h-[32rem] flex flex-col bg-white bg-opacity-none  justify-center bg-cover bg-center hover:shadow-xl hover:scale-[1.01] transform transition-transform duration-300"
        style={{
          backgroundImage:
            "url('https://scontent.fcai22-2.fna.fbcdn.net/v/t39.30808-6/455815435_813116620931890_8849671195779407477_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGx0HO6Gpo4fEUC8pk235Paf7Myk8ICN49_szKTwgI3jyxTq2n1ZL38Sz8_mtt7wKlEoldh7IzcmMLg29f3muj8&_nc_ohc=Xl1qpR8oXSUQ7kNvgEaPuox&_nc_ht=scontent.fcai22-2.fna&oh=00_AYBn_DM37KRcwsT4oQ7bMOzMLRCHBvcBfHkawaXUEPcn-g&oe=66E21D1C')",
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
              className="text-red-500 p-1 hover:bg-none fill-red-500 scale-[1.35]"
              variant="light"
            >
              <HeartIcon />
            </Button>
          </div>
          <div className="absolute bottom-3 right-0 py-2 rounded-md w-11/12 text-right text-white m-auto z-20 mt-auto">
            <Button className="text-white" variant="light">
              <Shoppingbag />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ProductCard;
