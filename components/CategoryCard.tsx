"use client";
import { useRouter } from "next/navigation";
import { Card } from "@nextui-org/react";
interface CategoryCardProps {
  name: string;
  path: string;
  id: number;
}

function Category({ name, path, id }: CategoryCardProps) {
  const router = useRouter();

  function handleOnClick() {
    //go to products page with the category selected
    router.push(`/products?categoryID=${id}`);
  }

  return (
    <>
      <Card
        disableRipple
        isHoverable
        className="w-[21rem] h-[33rem] bg-cover bg-center justify-center m-2 bg-white bg-opacity-none hover:shadow-xl hover:scale-105 transform transition-transform duration-300"
        style={{
          backgroundImage: `url('${path}')`,
        }}
        onClick={handleOnClick}
      >
        <div className="text-white flex flex-none bg-black h-full justify-center bg-opacity-50">
          <h1 className="text-4xl max-h-7 m-auto">{name}</h1>
        </div>
      </Card>
    </>
  );
}

export default Category;
