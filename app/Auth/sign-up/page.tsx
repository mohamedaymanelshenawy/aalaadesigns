"use client";
import React from "react";
import { Card, CardBody, Input, Button, Link, Image } from "@nextui-org/react";

export default function Singup() {
  return (
    <div className="flex justify-center items-start min-h-screen p-4">
      <Card className="w-full max-w-[100rem]">
        <CardBody className="flex flex-col items-center md:flex-row p-0 h-[40rem]">
          <div className="flex-1 flex flex-col h-full justify-center items-center p-12 bg-white">
            <Image
              alt="AALAA Designs Logo"
              className="w-72 h-72 object-contain mb-6"
              src="/logoblack.png"
            />
          </div>
          <div className="flex-1 p-12 mr-[50px] bg-white border-gray-200 rounded-3xl drop-shadow-md border-solid border-1">
            <h2 className="text-3xl font-semibold mb-3 filter-none">
              Welcome to <span className="font-light"> AALAA designs</span>
            </h2>
            <h3 className="text-3xl font-bold mb-9 ">Sign up</h3>
            <form className="space-y-7 ">
              <Input label="Enter your full name" size="lg" variant="flat" />
              <Input
                label="Enter your email address"
                size="lg"
                variant="flat"
              />
              <Input
                label="Enter your Password"
                size="lg"
                type="password"
                variant="flat"
              />
              <div className="flex justify-between items-center text-base drop-shadow-none">
                <Link className="text-blue-600" href="#">
                  No Account? Sign up
                </Link>
                <Link className="text-blue-600" href="#">
                  Forgot Password?
                </Link>
              </div>
              <Button
                disableRipple
                className="w-full bg-black text-white rounded"
                size="lg"
              >
                Sign up
              </Button>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
