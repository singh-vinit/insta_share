import { redirect, notFound } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

interface Params {
  params: { id: string };
}

export default async function Page({ params }: Params) {
  const { id } = await params;
  const { data } = await supabase
    .from("urls")
    .select("original_url")
    .eq("short_id", id)
    .single();
  if (!data) {
    notFound(); //404 page
  }
  redirect(data.original_url);
}
