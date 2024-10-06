"use client";
import { useEffect } from "react";
import { Card, Button, Link } from "@nextui-org/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Gorditas } from "next/font/google";
import { useTheme } from "next-themes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Image } from "@nextui-org/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useUser } from "@/app/contexts/UserContext";
import CategoryCard from "@/components/CategoryCard";
import NewArraivalCard from "@/components/NewArraivalCard";

import "../styles/globals.css";

const gorditas = Gorditas({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const categories = [
  { name: "Basics", imagePath: "/arrival1.png", index: "1" },
  { name: "Dresses", imagePath: "/dress.png", index: "2" },
  { name: "Tops", imagePath: "/arrival2.png", index: "3" },
  { name: "Skirts", imagePath: "/shirt.png", index: "4" },
  { name: "Abayas", imagePath: "/arrival3.png", index: "5" },
  { name: "Tunic", imagePath: "/arrival4.png", index: "6" },
  { name: "Scarves", imagePath: "/cardigan.png", index: "7" },
  { name: "Accessories", imagePath: "/dress.png", index: "8" },
  { name: "Denim", imagePath: "/jupe.png", index: "9" },
  { name: "Jackets/Coats/Blazers", imagePath: "/dress.png", index: "10" },
  { name: "Hoodies/Sweaters", imagePath: "/dress.png", index: "11" },
];

const newArrivals = [
  {
    name: "Dress",
    description: "Beautiful Dress",
    path: "/arrival1.png",
    price: "500",
  },
  {
    name: "Dress",
    description: "Beautiful Dress",
    path: "/arrival2.png",
    price: "500",
  },
  {
    name: "Dress",
    description: "Beautiful Dress",
    path: "/arrival3.png",
    price: "500",
  },
  {
    name: "Dress",
    description: "Beautiful Dress",
    path: "/arrival4.png",
    price: "500",
  },
];

//type User = {
//  email: string;
//  password: string;
//  id: number;
//  createdat: string;
//  username: string;
//};

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, setUser } = useUser();

  const { theme } = useTheme();

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <div>
      <Card className="w-full mx-auto overflow-hidden relative">
        <div className="relative aspect-[16/7]">
          <Image
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
        <div
          className={`h-[1px] ${theme === "light" ? "bg-black" : "bg-white"}  w-4/5`}
        />
      </div>
      <section className="py-8 px-4">
        <div className="max-w-[90rem] mx-auto text-center">
          <h1 className="text-5xl font-bold mx-3">Categories</h1>
          <h3 className="text-2xl mb-8">
            Mix & Match to level up your fashion game
          </h3>
          <div className="container mx-auto px-4 py-8 relative">
            <Swiper
              breakpoints={{
                410: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ clickable: true }}
              spaceBetween={20}
            >
              {categories.map((category) => (
                <SwiperSlide key={category.index}>
                  <CategoryCard
                    name={category.name}
                    path={category.imagePath}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
              <ChevronLeft className="w-8 h-8 text-gray-500" />
            </div>
            <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
              <ChevronRight className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>
      </section>
      <div className="w-full flex justify-center">
        <div
          className={`h-[1px] ${theme === "light" ? "bg-black" : "bg-white"}  w-4/5`}
        />
      </div>
      <section className="py-12 px-4">
        <div className="max-w-[91rem] mx-auto text-center">
          <h1 className="text-5xl font-bold m-3">New Arrivals </h1>
          <h3 className="text-2xl mb-8">Take a look at our newest items</h3>
          <div className="container mx-auto px-4 py-8 relative">
            <Swiper
              breakpoints={{
                410: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ clickable: true }}
              spaceBetween={20}
            >
              {newArrivals.map((item, index) => (
                <SwiperSlide key={index}>
                  <NewArraivalCard
                    description={item.description}
                    name={item.name}
                    path={item.path}
                    price={item.price}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
              <ChevronLeft className="w-8 h-8 text-gray-500" />
            </div>
            <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
              <ChevronRight className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
