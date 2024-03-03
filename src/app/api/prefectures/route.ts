import { fetchResas } from "@/app/api/utils/fetchServerSideResas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const apiRes = await fetchResas({ type: "prefectures", url: "prefectures", method: "GET" });
    apiRes.headers.set("Cache-Control", `public, max-age=${60 * 60 * 24 * 120}`);
    return apiRes;
  } catch (e) {
    if (e instanceof Error) return NextResponse.json({ error: e.message }, { status: 500 });
    return NextResponse.error();
  }
}
