"use client";
import { getUserById } from "@/lib/getUserById";
import { GetVideo } from "@/lib/getVideo";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const GridVideo = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      const fetchvid = await GetVideo();

      const withUserData = await Promise.all(
        fetchvid.map(async (video) => {
          const user = await getUserById(video.userId);
          return { ...video, userData: user };
        })
      );

      setVideos(withUserData);
    };

    handleFetch();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {videos.map((video, index) => (
        <div
          key={index}
          className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-zinc-900 transition hover:scale-[1.02]"
        >
          <Link href={`/videos/${video.id}`}>
            <div className="relative w-full h-[550px]">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
            </div>
          </Link>

          <div className="p-4">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-1">
              {video.title}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {video.desc}
            </p>

            {video.userData && (
              <Link
                href={`/user/${video.userData.uid}`}
                className="flex items-center gap-3 mt-4"
              >
                <div className="w-10 h-10 relative rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700">
                  <Image
                    src={video.userData.photoURL || "/default-avatar.png"}
                    alt={video.userData.username || "User"}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {video.userData.username || "Unknown User"}
                </span>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridVideo;
