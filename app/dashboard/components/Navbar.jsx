"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Loader, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Navbar = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) return <Loader className="w-5 h-5 animate-spin" />;

  const handleClick = () => {
    router.push("/dashboard/uploadVideo");
  };

  return (
    <div className="flex justify-between px-3 shadow-2xl items-center w-full h-[70px]">
      <div className="flex gap-4 items-center justify-center">
        <Image
          src={"/logo.svg"}
          width={440}
          height={550}
          className="w-[50px] h-[50px]"
          alt="logo"
        />
        <span className="text-xl mt-1">MyPop</span>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <Button
          onClick={handleClick}
          className="h-[50px] w-[170px] rounded-full cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2" />
          Upload Video
        </Button>
        {user?.photoURL && (
          <Image
            src={user.photoURL}
            width={50}
            height={50}
            alt="profile"
            className="w-[50px] h-[50px] object-cover rounded-full"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
