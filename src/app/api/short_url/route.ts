import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const { originalUrl, filePath } = await req.json();
    console.log("originalurl ->", originalUrl);
    const shortid = nanoid(6);
    console.log("shortid ->", shortid);
    const { error } = await supabase
      .from("urls")
      .insert([
        { original_url: originalUrl, short_id: shortid, file_path: filePath },
      ]);
    if (error) {
      console.log(error);
      return NextResponse.json({ error: "database error!" }, { status: 500 });
    }
    const shortUrl = `https://insta-share-file.vercel.app/${shortid}`;
    return NextResponse.json({ short_url: shortUrl }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
