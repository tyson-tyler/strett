import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Image
        src={"/giphy.gif"}
        width={500}
        height={500}
        alt="hellol"
        className="rounded-full"
      />
    </div>
  );
};

export default Loader;
