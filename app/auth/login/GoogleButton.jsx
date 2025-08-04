"use client";
import { Button } from "@/components/ui/button";
import { SignWithGoogle } from "@/lib/CreateUser";
import { Loader } from "lucide-react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export const GoogleButton = () => {
  const [loading, setLoading] = useState(false);
  const GoogleLogin = async () => {
    setLoading(true);

    const res = await SignWithGoogle();
    setLoading(false);
    return res;
  };

  return (
    <Button
      variant={"secondary"}
      className="h-[50px] mt-5 pl-2 w-full cursor-pointer"
      onClick={GoogleLogin}
    >
      {loading ? (
        <div className="flex gap-2">
          <Loader className="w-5 h-5 animate-spin" />
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <FaGoogle className="w-5 h-5" /> Cotinue With Google
        </div>
      )}
    </Button>
  );
};
