import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import Feature from "@/components/Feature";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#2d2d36]">
      <Header />
      <main className="p-12 flex justify-around border border-white">
        <FileUpload />
        <Feature />
      </main>
    </div>
  );
}
