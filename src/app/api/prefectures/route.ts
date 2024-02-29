import { fetchResas } from "@/app/api/utils/fetchServerSideResas";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest): Promise<Response> {
  try {
    const apiRes = await fetchResas({ type: "prefectures", url: "prefectures", method: "GET" });
    return apiRes;
  } catch (e) {
    if (e instanceof Error) return NextResponse.json({ error: e.message }, { status: 500 });
    return NextResponse.error();
  }
}
