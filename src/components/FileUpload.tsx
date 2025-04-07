"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const CirclePlus = () => {
  return (
    <svg
      className="w-16 h-16 text-orange-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      color="currentColor"
      fill="none"
    >
      <path
        d="M12 8V16M16 12H8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

  async function handleUpload() {
    setUploading(true);
    const filePath = `public${file?.name}`;
    const { data, error } = await supabase.storage
      .from("instant-share")
      .upload(filePath, file as File, {upsert: true});
    if (error) {
      alert("upload failed");
      console.log(error);
    } else {
      const { data } = await supabase.storage
        .from("instant-share")
        .getPublicUrl(filePath);
      console.log("public url ->", data);
    }
  }

  return (
    <div className="w-[20rem] h-[18rem] bg-[#42424a] rounded-2xl p-4 shadow-xl">
      <div className="p-2 w-full h-full border-2 border-dotted border-white rounded-2xl flex flex-col justify-center items-center gap-y-4 hover:bg-orange-400/10 transition-colors duration-300 ease-in-out">
        <CirclePlus />
        <p className="text-lg text-white text-center">
          click to browse or drag files here to start sharing
        </p>
      </div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>upload</button>
    </div>
  );
}

export default FileUpload;
