import React from "react";
import { Card, Button } from "@nextui-org/react";

import Shoppingbag from "@/components/svgs/Shoppingbag";

interface NewArraivalCardProps {
  name: string;
  description?: string;
  price?: string;
  isLiked?: boolean;
  isInCart?: boolean;
}

function NewArraivalCard({
  name,
  description,
  price,
  //isLiked = false,
  //isInCart = false,
}: NewArraivalCardProps) {
  return (
    <>
      <Card
        disableRipple
        isHoverable
        className="max-w-sm w-72 h-[34rem] m-2  flex flex-col bg-white bg-opacity-none  justify-center bg-cover bg-center hover:shadow-xl hover:scale-105 transform transition-transform duration-300"
        style={{
          backgroundImage:
            "url('https://scontent.fcai22-2.fna.fbcdn.net/v/t39.30808-6/455815435_813116620931890_8849671195779407477_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGx0HO6Gpo4fEUC8pk235Paf7Myk8ICN49_szKTwgI3jyxTq2n1ZL38Sz8_mtt7wKlEoldh7IzcmMLg29f3muj8&_nc_ohc=bOV7GM3CpqQQ7kNvgHyOAub&_nc_ht=scontent.fcai22-2.fna&_nc_gid=Aw4KY5meYQgbdN8PMIWF2bz&oh=00_AYDh_6yQ4PaoVytSFI33vinkQtvD5EjDiavHeWeiEtZLSg&oe=66F4921C')",
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black " />
          <div className="absolute bottom-0 left-0 right-0 p-2 rounded-md text-black w-11/12 text-left m-auto z-20 ">
            <p className="text-lg  text-white">{name}</p>
            <p className="text-md font-extralight text-white">{description}</p>
            <p className="text-xl font-bold text-white">{price} EGP</p>
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

export default NewArraivalCard;
