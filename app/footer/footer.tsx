"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="bg-gray-900 text-white py-12 px-4 bg-[url('/footer.png')] bg-cover bg-center">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Sign Up Now!</h2>
          <p className="mb-6">
            Get the Latest Beauty Secrets and level up your style
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Input
              className="max-w-xs bg-gray-800  rounded-2xl overflow-hidden"
              placeholder="Your E-mail"
              type="email"
            />
            <Button
              className="bg-white rounded-2xl text-black hover:bg-gray-200"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
      <div className="bg-[#deb887] text-black py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
          <div className="w-full sm:w-auto mb-8 sm:mb-0">
            {/*<Link className="text-4xl font-bold" href="/">
              AALAA DESIGNS
            </Link>*/}
            <Link className="inline-block" href="/">
              <Image
                alt="AALAA Logo"
                className="max-w-full h-auto"
                height={150}
                src="/logoblack.png"
                width={120}
              />
            </Link>
          </div>
          <div className="flex flex-wrap justify-between w-full sm:w-auto">
            <div className="w-1/2 sm:w-auto mb-4 sm:mb-0 mr-8">
              <h3 className="font-bold mb-2">Customer Care</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>

                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="w-1/2 sm:w-auto mb-4 sm:mb-0 mr-8">
              <h3 className="font-bold mb-2">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
                <li>
                  <Link href="/guides">Guides</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Conditions</Link>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-auto">
              <h3 className="font-bold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <Link
                  aria-label="Facebook"
                  href="https://www.facebook.com/AalaaDesigns/"
                >
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link
                  aria-label="Instagram"
                  href="https://www.instagram.com/aalaa_designs"
                >
                  <Instagram className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black text-white py-4 px-4 text-center">
        <p className="text-sm">© 2024 Aalaa Designs. All Rights Reserved</p>
      </div>
    </footer>
  );
}
