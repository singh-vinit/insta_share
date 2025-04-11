"use client";
import Image from "next/image";
import { SetStateAction } from "react";
import { useState } from "react";

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

const CopyLink = () => {
  return (
    <svg
      className="text-orange-500 h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      color="currentColor"
      fill="none"
    >
      <path
        d="M14.5563 13.2183C13.514 14.2606 11.8241 14.2606 10.7817 13.2183C9.73942 12.1759 9.73942 10.486 10.7817 9.44364L13.1409 7.0845C14.1357 6.08961 15.7206 6.04433 16.7692 6.94866M16.4437 3.78175C17.486 2.73942 19.1759 2.73942 20.2183 3.78175C21.2606 4.82408 21.2606 6.51403 20.2183 7.55636L17.8591 9.9155C16.8643 10.9104 15.2794 10.9557 14.2308 10.0513"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4999 3C7.21257 3 5.56889 3 4.46256 3.9079C4.25998 4.07414 4.07423 4.25989 3.90798 4.46247C3.00007 5.56879 3.00006 7.21247 3.00002 10.4998L3 12.9999C2.99996 16.7712 2.99995 18.6568 4.17152 19.8284C5.3431 21 7.22873 21 11 21H13.4999C16.7874 21 18.4311 21 19.5375 20.092C19.74 19.9258 19.9257 19.7401 20.092 19.5376C20.9999 18.4312 20.9999 16.7875 20.9999 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function Modal({ url, qrUrl, setOpen }: Props) {
  const [copied, setCopied] = useState(false);
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  return (
    <>
      <p className="absolute bottom-16 left-[30%] text-orange-500 text-4xl font-medium w-[40%] text-center animate-ping">
        {copied ? "Copied!" : null}
      </p>
      <div className="relative max-w-lg p-4 border border-orange-500 mx-auto my-20 bg-white/5 backdrop-blur-md rounded-xl">
        <button
          onClick={() => setOpen(false)}
          className="cursor-pointer absolute top-2 right-2"
        >
          <CancelIcon />
        </button>
        <div className="flex gap-x-4 justify-center items-start">
          <p className="text-lg text-white border border-orange-500 p-2 font-light mb-4 text-center">
            {url}
          </p>
          <button
            onClick={copyToClipboard}
            className="cursor-pointer bg-white rounded-xl p-2"
          >
            <CopyLink />
          </button>
        </div>
        <Image
          alt="qr"
          src={qrUrl}
          height={50}
          width={50}
          className="w-[200px] rounded-xl mx-auto"
        />
      </div>
    </>
  );
}
