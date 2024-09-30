"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Input, Button, Link, Image } from "@nextui-org/react";

export default function Singin() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const router = useRouter();

  // Async function to handle user signup
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

    fetch("http://localhost:3000/api/signin", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const parsedJson = JSON.parse(result);

        localStorage.setItem("user", JSON.stringify(parsedJson[0]));
        router.push("../");
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  }

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
            <h3 className="text-3xl font-bold mb-9 ">Sign in</h3>
            <form className="space-y-7 ">
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
                onClick={() => signinUser(emailValue, passwordValue)} // Call signupUser on click
              >
                Sign in
              </Button>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
