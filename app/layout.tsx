import "@/styles/globals.css";

import { Metadata } from "next";
//import { Image } from "@nextui-org/react";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "./providers";
import { UserProvider } from "./contexts/UserContext";
import Footer from "./footer/footer";
import { CartProvider } from "./contexts/CartContext";
import AppWrapper from "./AppWrapper";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import CustomNavBar from "@/components/navbar";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};
type Viewport = {
  themeColor: { media: string; color: string }[];
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

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
        <AppWrapper>
          <UserProvider>
            <CartProvider>
              <Providers
                themeProps={{ attribute: "class", defaultTheme: "light" }}
              >
                <div className="relative flex flex-col h-screen">
                  <CustomNavBar />
                  <main className="container mx-auto max-w-[80rem] pt-10 px-2 flex-grow">
                    {children}
                    <Analytics />
                    <SpeedInsights />
                  </main>
                  <footer>
                    <Footer />
                  </footer>
                </div>
              </Providers>
            </CartProvider>
          </UserProvider>
        </AppWrapper>
      </body>
    </html>
  );
}
