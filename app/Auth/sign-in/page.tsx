"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Input, Button, Link, Image } from "@nextui-org/react";

export default function Signin() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const router = useRouter();

  async function signinUser(email: string, password: string): Promise<void> {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: { email },
      password: { password },
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("/api/signin", requestOptions);
      const result = await response.text();
      const parsedJson = JSON.parse(result);

      localStorage.setItem("user", JSON.stringify(parsedJson[0]));
      router.push("../");
    } catch (error) {}
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-6xl shadow-xl">
        <CardBody className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
              <Image
                alt="AALAA Designs Logo"
                className="w-48 h-48 md:w-72 md:h-72 object-contain mb-6"
                src="/logoblack.png"
              />
              <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
                Welcome to <span className="font-light">AALAA designs</span>
              </h2>
            </div>
            <div className="flex-1 p-8 bg-gray-50 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Sign in</h3>
              <form className="space-y-6">
                <Input
                  isClearable
                  id="email"
                  label="Enter your email address"
                  size="lg"
                  variant="flat"
                  onValueChange={setEmailValue}
                />
                <Input
                  isClearable
                  id="password"
                  label="Enter your Password"
                  size="lg"
                  type="password"
                  variant="flat"
                  onValueChange={setPasswordValue}
                />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm space-y-2 sm:space-y-0">
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
                  onClick={() => signinUser(emailValue, passwordValue)}
                >
                  Sign in
                </Button>
              </form>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
