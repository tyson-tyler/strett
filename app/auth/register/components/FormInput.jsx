import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateUser } from "@/lib/CreateUser";
import { sendEmailVerification } from "firebase/auth";
import { Loader, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const FormInput = () => {
  const [formState, setFormState] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileImage, setFileImage] = useState(null);
  const [username, setUserame] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [confirmPassord, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [uploaded, setUploaded] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const ImageCloudinar = async () => {
    const formdata = new FormData();
    formdata.append("file", fileImage);

    const res = await fetch("/upload-action", {
      method: "POST",
      body: formdata,
    });
    const data = await res.json();
    console.log(data);
    return data;
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileImage(file);

    setPrevImage(URL.createObjectURL(file));
  };

  const validateStep = async () => {
    if (formState == 1) {
      if (!email.trim()) {
        setError("Email is Required");

        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Invalid email address");

        return;
      }
      if (!username) {
        setError("Username is Required");

        return;
      }
      setError("");
      setFormState(2);
    }

    if (formState == 2) {
      if (!password) {
        setError("Password is Required");
        return;
      }
      if (!password.length > 8) {
        setError("Password must be at least 8");
        return;
      }
      if (!confirmPassord) {
        setError("Confirm Password must Required");
        return;
      }
      if (password !== confirmPassord) {
        setError("Password Must Match");
        return;
      }
      setError("");
      setFormState(3);
    }
    if (formState == 3) {
      if (!fileImage) {
        setError("File Must Required");
        return;
      }

      console.log(email, password, fileImage, username);

      try {
        setLoading(true);
        const res = await ImageCloudinar();

        setUploaded(res.url);

        const user = await CreateUser(email, password, res.url, username);
        console.log(user);
        setLoading(false);
        toast.success("User Got Created");

        router.push("/auth/login");
        return user.uid;
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="max-w-[700px] mt-2 w-full px-5">
      {error && (
        <div className="flex justify-center items-center h-[40px] bg-red-500  text-white rounded-md transition">
          {error}
        </div>
      )}
      {formState == 1 && (
        <div>
          <label>Username</label>
          <Input
            type="text"
            value={username}
            className="h-[50px] mt-2 pl-4 w-full mb-4"
            placeholder="johnkyler"
            onChange={(e) => setUserame(e.target.value)}
            required
          />
          <label>Email</label>
          <Input
            type="email"
            value={email}
            className="h-[50px] mt-2 pl-4 w-full "
            placeholder="john@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      )}
      {formState == 2 && (
        <div>
          <label>Password</label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="h-[50px] mt-2 pl-2 w-full mb-4"
          />
          <label>Confirm Password</label>
          <Input
            type="password"
            value={confirmPassord}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-[50px] mt-2 pl-2 w-full "
          />
        </div>
      )}
      {formState == 3 && (
        <div className="flex justify-center items-center">
          {!prevImage && (
            <label
              htmlFor="file-upload"
              className="cursor-pointer mt-3 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-[150px] w-full mb-4 hover:border-blue-400 transition"
            >
              <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
              <span className="text-gray-500 text-sm">
                Click or drag to upload
              </span>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}

          {prevImage && (
            <div className="relative inline-block">
              <Image
                src={prevImage}
                alt="preview"
                width={500}
                height={500}
                className="w-[140px] h-[140px] rounded-full object-cover"
              />
              <button
                onClick={() => setPrevImage(null)} // Optional: remove preview
                className="absolute top-1 right-1 bg-red-500 text-white w-[30px] h-[30px] rounded-full hover:bg-red-400 cursor-pointer transition"
              >
                <span className="w-3 h-3">X</span>
              </button>
            </div>
          )}
        </div>
      )}

      {formState == 4 && (
        <div className="flex w-full items-center justify-center">
          <h2 className="text-xl">Send You Email Verfiy Link</h2>
        </div>
      )}
      {formState == 4 ? (
        <div className="flex items-center justify-center">Not Get Link</div>
      ) : (
        <Button
          className="h-[50px] mt-5 pl-2 w-full cursor-pointer"
          onClick={validateStep}
        >
          {loading ? (
            <div className="flex gap-2">
              <Loader className="w-5 h-5 animate-spin" />
            </div>
          ) : (
            <div>{formState === 3 ? "Submit" : "Next"}</div>
          )}
        </Button>
      )}
    </div>
  );
};

export default FormInput;
