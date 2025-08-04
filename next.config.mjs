import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default withNextVideo(nextConfig);