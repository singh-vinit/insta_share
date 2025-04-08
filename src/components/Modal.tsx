"use client";
import Image from "next/image";
import { SetStateAction } from "react";

interface Props {
  url: string;
  qrUrl: string;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

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

export default function Modal({ url, qrUrl, setOpen }: Props) {
  return (
    <div className="relative w-fit p-4 border border-white mx-auto my-20 bg-white/20 backdrop:blur-2xl">
      <button
        onClick={() => setOpen(false)}
        className="cursor-pointer absolute top-2 right-2"
      >
        <CancelIcon />
      </button>
      <p className="text-white text-lg font-medium">{url}</p>
      <Image
        alt="qr"
        src={qrUrl}
        height={50}
        width={50}
        className="w-[200px]"
      />
    </div>
  );
}
