"use client";
import { Card, Button, Link } from "@nextui-org/react";
import { ArrowUpRight } from "lucide-react";
import { Gorditas } from "next/font/google";

import CategoryCard from "@/components/CategoryCard";
import NewArraivalCard from "@/components/NewArraivalCard";

//import Shop from "@/shop/shopPage";
// import globale styles
import "../styles/globals.css";
//const shopPage = "/shop";
//const cartPage = "/cart";
const gorditas = Gorditas({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <div className="delay-300 transtion">
      <Card className="w-full mx-auto overflow-hidden relative">
        <div className="relative aspect-[16/7]">
          <img
            alt="Summer Collection"
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="https://scontent.fcai22-2.fna.fbcdn.net/v/t39.30808-6/445776928_768402162070003_1987524795555289104_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFy_2L57uEASdEsnv-rWG7p9BYvEF2CJMf0Fi8QXYIkxxwBIL6S4Zo_96uD9_6YLkEjMj9LACKKuF5nrCf3XvNh&_nc_ohc=CF4De-Kxl9wQ7kNvgG3TfM7&_nc_ht=scontent.fcai22-2.fna&oh=00_AYBPEZ5dA8Xtv-qAD04ZIVJ-cXah_LIA4_aRYfZjeGfCmw&oe=66F4877E"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
            <h2
              className={`${gorditas.className} text-3xl md:text-4xl lg:text-5xl font-bold text-center max-w-3xl mx-auto`}
            >
              Discover The New Trending Summer Collection
            </h2>
            <div className="w-full flex justify-center">
              <Button
                as={Link}
                className="bg-black text-white hover:bg-gray-900 hover:opacity-60 transition-colors group px-6 py-3"
                href="/shop"
              >
                Shop Now
                <span className="ml-2 bg-white rounded-full p-1 inline-flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-black transition-transform group-hover:scale-[1.15]" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <div className="mt-10 w-full flex justify-center">
        <div className="h-[1px] bg-black w-4/5" />
      </div>
      {/*<Shop />*/}
      <section className="py-8 px-4">
        <div className="max-w-[91rem] mx-auto text-center">
          <h1 className="text-5xl font-bold mx-3">Categories</h1>
          <h3 className="text-2xl mb-8">
            Mix & Match to level up your fashion game
          </h3>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <CategoryCard name="Shirts" path="/shirt.png" />
              <CategoryCard name="Dresses" path="dress.png" />
              <CategoryCard name="Cardigans" path="cardigan.png" />
              <CategoryCard name="Jupes" path="jupe.png" />
            </div>
          </div>
        </div>
      </section>
      <div className="w-full flex justify-center">
        <div className="h-[1px] bg-black w-4/5" />
      </div>
      <section className="py-12 px-4">
        <div className="max-w-[91rem] mx-auto text-center">
          <h1 className="text-5xl font-bold m-3">New Arrivals </h1>
          <h3 className="text-2xl mb-8">Take a look at our newsest items</h3>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <NewArraivalCard
                description="Beutiful Dress"
                name="Dress"
                path="/arrival1.png"
                price="500"
              />
              <NewArraivalCard
                description="Beutiful Dress"
                name="Dress"
                path="/arrival2.png"
                price="500"
              />
              <NewArraivalCard
                description="Beutiful Dress"
                name="Dress"
                path="/arrival3.png"
                price="500"
              />
              <NewArraivalCard
                description="Beutiful Dress"
                name="Dress"
                path="/arrival4.png"
                price="500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
