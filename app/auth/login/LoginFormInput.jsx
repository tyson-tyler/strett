"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginUser } from "@/lib/LoginUser";
import { Loader, LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GoogleButton } from "./GoogleButton";

const LoginFormInput = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    setLoading(true);

    const res = await LoginUser(email, password);

    if (res == 400) {
      setError("Invalid Username and Password");
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  };
  return (
    <div className="max-w-[700px] mt-2 w-full px-5">
      {error && (
        <div className="flex justify-center items-center h-[40px] bg-red-500  text-white rounded-md transition">
          {error}
        </div>
      )}
      <label>Email</label>
      <Input
        type="text"
        value={email}
        className="h-[50px] mt-2 pl-4 w-full mb-4"
        placeholder="johnkyler@example.com"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Password</label>
      <Input
        type="password"
        value={password}
        className="h-[50px] mt-2 pl-4 w-full "
        placeholder="*********"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button
        className="h-[50px] mt-5 pl-2 w-full cursor-pointer"
        onClick={handleLogin}
      >
        {loading ? (
          <div className="flex gap-2">
            <LoaderCircleIcon className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <div>Login</div>
        )}
      </Button>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500 font-semibold">OR</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      <GoogleButton />
    </div>
  );
};

export default LoginFormInput;
