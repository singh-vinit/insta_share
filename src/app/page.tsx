import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import Feature from "@/components/Feature";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#2d2d36]">
      <Header />
      <main className="px-12 py-20 flex justify-around">
        <FileUpload />
        <Feature />
      </main>
    </div>
  );
}
