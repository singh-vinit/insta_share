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
    <div className="min-h-screen bg-[#2d2d36]">
      <Header />
      {open ? (
          <Modal url={url} qrUrl={qrUrl} setOpen={setOpen} />
      ) : (
        <main className="px-12 py-20 flex justify-around">
          <FileUpload setUrl={setUrl} setQrUrl={setQrUrl} setOpen={setOpen} />
          <Feature />
        </main>
      )}
    </div>
  );
}
