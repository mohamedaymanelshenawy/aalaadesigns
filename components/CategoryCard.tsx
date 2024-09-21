"use client";
import React from "react";
import { Card } from "@nextui-org/react";
interface CategoryCardProps {
  name: string;
}

function Category({ name }: CategoryCardProps) {
  return (
    <>
      <Card
        disableRipple
        isHoverable
        className="w-[18rem] h-[31rem] bg-cover bg-center justify-center m-2 bg-white bg-opacity-none  hover:shadow-xl hover:scale-105 transform transition-transform duration-300"
        style={{
          backgroundImage:
            "url('https://scontent.fcai22-2.fna.fbcdn.net/v/t39.30808-6/455815435_813116620931890_8849671195779407477_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGx0HO6Gpo4fEUC8pk235Paf7Myk8ICN49_szKTwgI3jyxTq2n1ZL38Sz8_mtt7wKlEoldh7IzcmMLg29f3muj8&_nc_ohc=bOV7GM3CpqQQ7kNvgHyOAub&_nc_ht=scontent.fcai22-2.fna&_nc_gid=Aw4KY5meYQgbdN8PMIWF2bz&oh=00_AYDh_6yQ4PaoVytSFI33vinkQtvD5EjDiavHeWeiEtZLSg&oe=66F4921C')",
        }}
      >
        <div className="text-white flex flex-none bg-black h-full justify-center bg-opacity-70">
          <h1 className="text-4xl max-h-7 m-auto">{name}</h1>
        </div>
      </Card>
    </>
  );
}

export default Category;
