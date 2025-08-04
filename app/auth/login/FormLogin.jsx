"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import LoginFormInput from "./LoginFormInput";

const FormLogin = () => {
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
        <h1 className="flex text-5xl font-semibold">Welcome Back GooDays</h1>
        <span className="text-sm text-gray-500">
          Hello nice to see you again
        </span>
        <LoginFormInput />
        <div className=" absolute bottom-3">
          Don't Have an Account{" "}
          <Link href={"/auth/register"} className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
