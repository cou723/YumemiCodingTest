import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { fetchResas } from "@/app/api/utils/fetchServerSideResas";

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
