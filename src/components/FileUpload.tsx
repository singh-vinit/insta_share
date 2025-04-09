"use client";
import React, { useState, SetStateAction } from "react";
import { supabase } from "@/utils/supabaseClient";
import { generateQr } from "@/utils/generateQr";

//svgs
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

export const CancelIcon = () => {
  return (
    <svg
      className="h-6 w-6 text-orange-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      color="currentColor"
      fill="none"
    >
      <path
        d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface Props {
  setUrl: React.Dispatch<SetStateAction<string>>;
  setQrUrl: React.Dispatch<SetStateAction<string>>;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

function FileUpload({ setUrl, setQrUrl, setOpen }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isFile, setIsFile] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setIsFile(true);
    }
  }

  function handleCancel() {
    setFile(null);
    setIsFile(false);
  }

  async function handleUpload() {
    setUploading(true);
    const filePath = `${Date.now()}-${file?.name}`;
    const { error } = await supabase.storage
      .from("instant-share")
      .upload(filePath, file as File);
    if (error) {
      alert("upload failed");
      console.log(error);
    } else {
      const { data } = supabase.storage
        .from("instant-share")
        .getPublicUrl(filePath);
      // get the custom shorten url
      const res = await fetch("/api/short_url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: data.publicUrl, filePath: filePath }),
      });
      const result: { short_url: string } = await res.json();
      const qr = await generateQr(result.short_url);
      setUrl(result.short_url);
      setQrUrl(qr as string);
      setUploading(false);
      setOpen(true);
    }
  }

  const size = file?.size;
  let fileSize;
  if (size) {
    if (size.toString().length <= 6) {
      fileSize = `${(size / 1000).toFixed(2)} KB`;
    } else {
      fileSize = `${(size / 1000000).toFixed(2)} MB`;
    }
  }

  return (
    <div className="text-center">
      <div className="w-[20rem] h-[18rem] bg-[#42424a] rounded-2xl p-4 shadow-xl">
        <input
          id="file-upload"
          className="hidden"
          type="file"
          disabled={isFile}
          onChange={handleFileChange}
        />
        {!isFile ? (
          <label
            htmlFor="file-upload"
            className="p-2 w-full h-full border-2 border-dotted border-white rounded-2xl flex flex-col justify-center items-center gap-y-4
             hover:bg-orange-500/10 cursor-pointer transition-colors duration-300 ease-in-out"
          >
            <span className={`${isFile ? "hidden" : null}`}>
              <CirclePlus />
            </span>
            <p
              className={`text-lg text-white text-center ${
                isFile ? "hidden" : null
              }`}
            >
              click to browse or drag files here to start sharing
            </p>
          </label>
        ) : (
          <div className="relative text-white font-light p-2 w-full h-full border-2 border-dotted border-white rounded-2xl flex flex-col justify-center items-center gap-y-4 bg-orange-500/10">
            <button
              onClick={handleCancel}
              className="cursor-pointer absolute top-2.5 right-2.5"
            >
              <CancelIcon />
            </button>
            <p>{file?.name}</p>
            <p>{fileSize}</p>
            <p>{file?.type}</p>
          </div>
        )}
      </div>
      {isFile ? (
        <button
          onClick={handleUpload}
          className="bg-orange-500 px-6 py-2 rounded-xl mt-4 text-white font-medium text-lg shadow-lg hover:scale-105"
        >
          upload
        </button>
      ) : null}
    </div>
  );
}

export default FileUpload;
