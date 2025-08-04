"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { AddtoVideoId } from "@/lib/addVideoIdtoUser";
import { CreateVideoNow } from "@/lib/CreateVideo";
import { generateDescription } from "@/lib/gemini";
import axios from "axios";

import {
  CloudUpload,
  Loader,
  Loader2,
  UploadCloud,
  Videotape,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const FormVideo = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [thumnail, setThumnail] = useState();
  const [uservideo, setUserVideo] = useState();
  const [prevVideo, setPreVideo] = useState();
  const [loading, setLoading] = useState(false);
  const [prevImage, setPrevImage] = useState("");
  const [thumnailUrl, setThumnailUrl] = useState("");
  const router = useRouter();
  const { user, loading1 } = useAuth();

  if (!user && !loading1) {
    return <Loader2 className="w-4 h-4 animate-spin" />;
  }

  console.log(title, desc, thumnail, uservideo);

  const handleDesc = async () => {
    try {
      setLoading(true);
      const res = await generateDescription(title);
      const match = res.match(/\{[\s\S]*?\}/);
      if (!match) throw new Error("No JSON found in response");

      const parsed = JSON.parse(match[0]);
      setDesc(parsed.description);
    } catch (error) {
      console.error("Failed to parse description:", error);
      setDesc("Error: Could not generate description.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setPrevImage(preview);
    setThumnail(file);
  };

  const handleVideo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setUserVideo(preview);
    setPreVideo(file);
  };

  const UploadThumbnail = async () => {
    const newFile = new FormData();

    newFile.append("file", thumnail);

    try {
      const res = await axios.post("/api/upload-action", newFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setThumnailUrl(res.data.url);
      console.log(thumnailUrl);
      return res.data.url;
    } catch (error) {
      console.log(error);
    }
  };
  const UploadVideoSrc = async () => {
    const newFile = new FormData();

    newFile.append("file", prevVideo);

    try {
      const res = await axios.post("/api/upload-action", newFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPreVideo(res.data.url);
      console.log(prevVideo);
      return res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const CreatePostSubmit = async () => {
    setLoading(true);

    try {
      if (!user) {
        toast.error("USER IS nOT Found");
        setLoading(false);
        return;
      }

      const userId = user.uid;
      const thumnaile = await UploadThumbnail();
      const videohar = await UploadVideoSrc();
      setLoading(false);
      console.log(thumnaile, videohar);

      if (!thumnaile || !videohar) {
        toast.error("Failed to upload media");
        setLoading(false);
        return;
      }
      if (!title || !desc || !thumnaile || !videohar) {
        toast.error("All Field Are Required");
        return;
      } else {
        const postcreate = await CreateVideoNow(
          title,
          desc,
          thumnaile,
          videohar,
          userId
        );
        await AddtoVideoId(userId, postcreate.postId);
        toast.success("Video Got Upload");
        console.log(postcreate);

        setTitle("");
        setDesc("");
        setThumnail(null);
        setUserVideo(null);
        setPrevImage("");
        setPreVideo(null);
        setThumnailUrl("");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Post Upload FAILED", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-start justify-center min-h-screen py-10 bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Upload Video</h2>

        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            type="text"
            value={title}
            className="mt-2"
            placeholder="Enter your video title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="pr-24 h-[140px]"
            placeholder="Description generated from title or manually entered"
          />
          <button
            onClick={handleDesc}
            className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded transition flex items-center gap-2"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            Generate with AI
          </button>
        </div>

        {/* Image Upload */}
        <div className="flex gap-2">
          <div className="h-[250px] w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail Image
            </label>
            {!prevImage ? (
              <label
                htmlFor="file-upload"
                className="cursor-pointer  flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-[200px] w-full hover:border-blue-400 transition bg-gray-100"
              >
                <UploadCloud className="w-6 h-6 text-gray-500 mb-1" />
                <span className="text-gray-500 text-sm">
                  Click or drag to upload image
                </span>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="border flex justify-center items-center rounded-md overflow-hidden w-full max-h-[240px] py-2 ">
                <Image
                  src={prevImage}
                  alt="Thumbnail preview"
                  width={800}
                  height={240}
                  className="h-[180px] w-[150px] object-cover rounded-md"
                />
                <Button
                  className={
                    "rounded-full w-5 h-5 bg-red-500 hover:bg-red-400 cursor-pointer"
                  }
                  onClick={() => setPrevImage(null)}
                >
                  X
                </Button>
              </div>
            )}
          </div>

          {/* Video Upload */}
          <div className="h-[200px] w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video File
            </label>
            {!uservideo ? (
              <label
                htmlFor="file-upload-video"
                className="cursor-pointer h-[200px] w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md  hover:border-blue-400 transition bg-gray-100"
              >
                <Videotape className="w-6 h-6 text-gray-500 mb-1" />
                <span className="text-gray-500 text-sm">
                  Click or drag to upload video
                </span>
                <Input
                  id="file-upload-video"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideo}
                />
              </label>
            ) : (
              <div className="border flex justify-center items-center rounded-md overflow-hidden w-full max-h-[240px] py-2 ">
                <video
                  src={uservideo}
                  controls
                  className="rounded-md h-[180px] w-[150px]  bg-black"
                />
                <Button
                  className={
                    "rounded-full w-5 h-5 bg-red-500 hover:bg-red-400 cursor-pointer"
                  }
                  onClick={() => setUserVideo(null)}
                >
                  X
                </Button>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <Button
            onClick={CreatePostSubmit}
            className="w-full h-[60px] rounded-full flex gap-2 cursor-pointer"
          >
            <Loader className="w-5 h-5 animate-spin" />
            Live Now
          </Button>
        ) : (
          <Button
            onClick={CreatePostSubmit}
            className="w-full h-[60px] rounded-full flex gap-2 cursor-pointer"
          >
            <CloudUpload className="w-5 h-5" />
            Live Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormVideo;
