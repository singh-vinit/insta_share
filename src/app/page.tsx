"use client";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import Feature from "@/components/Feature";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen min-w-screen py-4 bg-[#2d2d36]">
      <Header />
      {open ? (
        <Modal url={url} qrUrl={qrUrl} setOpen={setOpen} />
      ) : (
        <main className="px-12 py-20 flex justify-around">
          <FileUpload setUrl={setUrl} setQrUrl={setQrUrl} setOpen={setOpen} />
          <Feature />
        </main>
      )}
      <div className="fixed bottom-0  w-[100%] h-[350px] rounded-t-full bg-gradient-to-t from-orange-500/20 to-transparent blur-3xl pointer-events-none" />
    </div>
  );
}
