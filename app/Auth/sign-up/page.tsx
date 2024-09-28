"use client";
import React from "react";
import { Card, CardBody, Input, Button, Link, Image } from "@nextui-org/react";

export default function Signup() {
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
          <div className="flex-1 p-12 border-gray-500 rounded border-solid border-1">
            <h2 className="text-3xl font-semibold mb-3">
              Welcome to AALAA DESIGNS
            </h2>
            <h3 className="text-4xl font-bold mb-9">Sign in</h3>
            <form className="space-y-6">
              <Input
                label="Enter your username or email address"
                size="lg"
                variant="bordered"
              />
              <Input
                label="Enter your Password"
                size="lg"
                type="password"
                variant="bordered"
              />
              <div className="flex justify-between items-center text-base">
                <Link className="text-blue-600" href="#">
                  No Account? Sign up
                </Link>
                <Link className="text-blue-600" href="#">
                  Forgot Password?
                </Link>
              </div>
              <Button className="w-full" color="success" size="lg">
                Sign in
              </Button>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
