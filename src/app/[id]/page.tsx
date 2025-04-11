import { notFound } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import DownloadBtn from "@/components/DownloadBtn";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  console.log(id);
  const { data } = await supabase
    .from("urls")
    .select("original_url, file_path")
    .eq("short_id", id)
    .single();
  if (!data) {
    notFound(); //404 page
  }
  const res = await supabase.storage.from("instant-share").info(data.file_path);

  const size = res.data?.size;
  let fileSize;
  if (size) {
    if (size.toString().length <= 6) {
      fileSize = `${(size / 1000).toFixed(2)} KB`;
    } else {
      fileSize = `${(size / 1000000).toFixed(2)} MB`;
    }
  }

  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center bg-neutral-800">
      <div className="w-xl p-4 bg-white/20 rounded-xl">
        <p className="text-white font-medium">{res.data?.name}</p>
        <div className="flex justify-between items-center">
          <p className="text-white font-medium">{res.data?.contentType}</p>
          <p className="text-white font-medium">{fileSize}</p>
        </div>
        <DownloadBtn
          original_url={data.original_url}
          content_type={res.data?.contentType as string}
        />
      </div>
    </div>
  );
}
