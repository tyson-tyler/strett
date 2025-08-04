"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import FormInput from "./FormInput";

const FormRegister = () => {
  const [formState, setFormState] = useState(1);
  return (
    <div className="flex w-full h-screen">
      {/* Left Side Image (30% width on lg screens) */}
      <div className="hidden lg:flex w-0 lg:w-[60%] h-full">
        <Image
          src="/login.jpg"
          width={13900}
          height={1000}
          className="object-cover w-full h-full"
          alt="Login Background"
          priority
        />
      </div>

      {/* Right Side Form (takes remaining 70%) */}
      <div className="w-full  flex-col lg:w-[70%] h-full flex items-center justify-center">
        <h1 className="flex text-5xl font-semibold">Welcome To GooDays</h1>
        <span className="text-sm text-gray-500">
          Create A New Account Enjoy Free Hentai
        </span>
        <FormInput />
        <div className=" absolute bottom-3">
          Have an Account{" "}
          <Link href={"/auth/login"} className="text-blue-500">
            Login.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
