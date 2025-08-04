"use client";
import { getUserById } from "@/lib/getUserById";
import { getVideoById } from "@/lib/getVideoById";
import Video from "next-video";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const handleVideo = async () => {
      if (!videoId) return;

      const video = await getVideoById(videoId);
      const user = await getUserById(video.userId);

      setVideoData(video);
      setUserData(user);
    };

    handleVideo();
  }, [videoId]);

  if (!videoData || !userData) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto mt-6 px-4 gap-8">
      {/* Left Column (Video + Info) */}
      <div className="flex-1">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
          <Video
            src={videoData.videoSrc}
            controls
            className="w-full h-full object-contain"
          />
        </div>

        {/* Video Title */}
        <h1 className="text-2xl font-bold mt-4 text-gray-900">
          {videoData.title}
        </h1>

        {/* Video Stats + Actions */}
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
          <span>123,456 views • Aug 4, 2025</span>
          <div className="flex gap-4">
            <button className="hover:bg-gray-200 p-2 rounded-lg">
              👍 1.2K
            </button>
            <button className="hover:bg-gray-200 p-2 rounded-lg">👎</button>
            <button className="hover:bg-gray-200 p-2 rounded-lg">
              🔗 Share
            </button>
          </div>
        </div>

        {/* Channel Info */}
        <div className="flex items-start mt-6 gap-4 border-t pt-4">
          <Image
            src={userData.photoURL}
            alt={userData.username}
            width={40}
            height={50}
            className="rounded-full w-[50px] h-[50px] object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{userData.username}</span>
            <span className="text-sm text-gray-600">12.4K subscribers</span>
            <p className="mt-2 text-gray-800">{videoData.desc}</p>
          </div>
        </div>
      </div>

      {/* Right Column (Recommended) */}
      <div className="w-full lg:w-80 space-y-4">
        {/* You can map recommended videos here */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-2">
            <div className="w-36 h-20 bg-gray-200 rounded-md"></div>
            <div className="flex flex-col text-sm">
              <span className="font-semibold line-clamp-2">
                Sample Recommended Video Title Goes Here
              </span>
              <span className="text-gray-600">Channel Name</span>
              <span className="text-gray-500">25K views • 1 week ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
