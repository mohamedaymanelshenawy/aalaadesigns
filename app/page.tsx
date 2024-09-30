"use client";
import { useState, useEffect } from "react";
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

type User = {
  email: string;
  password: string;
  id: number;
  createdat: string;
  username: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const newUser = localStorage.getItem("user");

      if (newUser) {
        var userString: string = newUser;
        const parsedUser = JSON.parse(userString);

        if (parsedUser !== user) {
          setUser(parsedUser);
        }
      }
    }
  }, []);

  return (
    <div>
      <Card className="w-full mx-auto overflow-hidden relative">
        <div className="relative aspect-[16/7]">
          <img
            alt="Summer Collection"
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="/landing.png"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
            <h2
              className={`${gorditas.className} md:text-5xl lg:text-7xl opacity-[0.7] font-bold text-center max-w-6xl mx-auto`}
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
            <div className="flex flex-wrap justify-center gap-4 ">
              <CategoryCard name="Shirts" path="/shirt.png" />
              <CategoryCard name="Dresses" path="/dress.png" />
              <CategoryCard name="Cardigans" path="/cardigan.png" />
              <CategoryCard name="Jupes" path="/jupe.png" />
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
            <div className="flex flex-wrap justify-center gap-4">
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
