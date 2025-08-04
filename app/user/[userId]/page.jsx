"use client";
import { getUserById } from "@/lib/getUserById";
import { getVideoById } from "@/lib/getVideoIdUser";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [videoGrid, setVideoGrid] = useState([]);

  useEffect(() => {
    const handleSubmit = async () => {
      const res = await getUserById(userId);
      if (res.Videos && Array.isArray(res.Videos)) {
        const videoData = await getVideoById(res.Videos);
        setVideoGrid(videoData);
      }
      setUserData(res);
    };

    handleSubmit();
  }, [userId]);

  if (!userData) return <div className="p-4">Loading...</div>;

  return (
    <>
      {/* Profile Header */}
      <div className="flex flex-col items-center justify-center py-10 px-4">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-pink-500 shadow-md">
          <Image
            src={userData.photoURL}
            alt={userData.username}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="mt-4 text-2xl font-semibold">{userData.username}</h1>
        <p className="text-gray-500">@{userData.username.toLowerCase()}</p>
      </div>

      {/* Videos Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl font-bold mb-6">Your Videos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videoGrid.map((item, index) => (
            <div
              key={index}
              className="relative group aspect-square overflow-hidden rounded-lg cursor-pointer shadow hover:scale-105 transition-transform"
            >
              <Image
                src={item.thumbnail}
                alt={item.title || "Video Thumbnail"}
                fill
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium">
                {item.title || "Untitled"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
