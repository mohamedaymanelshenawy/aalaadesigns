"use client";
import "@/styles/globals.css";
//import { Metadata } from "next";

//import { Image } from "@nextui-org/react";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import CustomNavBar from "@/components/navbar";

//export const metadata: Metadata = {
//  title: {
//    default: siteConfig.name,
//    template: `%s - ${siteConfig.name}`,
//  },
//  description: siteConfig.description,
//  icons: {
//    icon: "/favicon.ico",
//  },
//};
//type Viewport = {
//  themeColor: { media: string; color: string }[];
//};
//export const viewport: Viewport = {
//  themeColor: [
//    { media: "(prefers-color-scheme: light)", color: "white" },
//    { media: "(prefers-color-scheme: dark)", color: "black" },
//  ],
//};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "max-h-screen bg-background font-sans antialiased",
          // eslint-disable-next-line prettier/prettier
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <CustomNavBar />
            <main className="container mx-auto max-w-[80rem] pt-10 px-2 flex-grow">
              {children}
              <Analytics />
            </main>
            <footer
              className="w-full h-[30rem] items-center justify-center"
              //style={{
              //  backgroundImage:
              //    "url('https://img.freepik.com/premium-photo/row-clothes-are-hanging-rack-dark-room-banner-website_962764-82448.jpg?w=826')",
              //}}
            >
              {/*<div className="w-full flex items-center justify-center">
                <Image
                  className="w-full"
                  src="https://img.freepik.com/premium-photo/row-clothes-are-hanging-rack-dark-room-banner-website_962764-82448.jpg?w=826"
                />*/}
              <h1 className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} {siteConfig.name}
              </h1>
              {/*</div>*/}
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
