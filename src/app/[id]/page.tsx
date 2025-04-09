import { redirect, notFound } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import DownloadBtn from "@/components/DownloadBtn";

interface Params {
  params: { id: string };
}

export default async function Page({ params }: Params) {
  const { id } = await params;
  const { data } = await supabase
    .from("urls")
    .select("original_url, file_path")
    .eq("short_id", id)
    .single();
  if (!data) {
    notFound(); //404 page
  }
  const res = await supabase.storage.from("instant-share").info(data.file_path);
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center bg-red-500">
      <div className="w-xl p-4 bg-neutral-400 rounded-2xl">
        <p>{res.data?.name}</p>
        <div className="flex justify-between items-center">
          <p>{res.data?.contentType}</p>
          <p>{res.data?.size}</p>
        </div>
        <DownloadBtn
          original_url={data.original_url}
          content_type={res.data?.contentType as string}
        />
      </div>
    </div>
  );
}
