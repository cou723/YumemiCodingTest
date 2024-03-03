import { NextResponse } from "next/server";
import { z } from "zod";

import type { NextRequest } from "next/server";

import { fetchResas } from "@/app/api/utils/fetchServerSideResas";

const RequestBodySchema = z.object({
  prefCode: z.number(),
  cityCode: z.string(),
});

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url!);
  const params = { prefCode: parseInt(searchParams.get("prefCode")!), cityCode: searchParams.get("cityCode") };

  const result = RequestBodySchema.safeParse(params);
  if (result.success === false) return NextResponse.json({ error: result.error.message }, { status: 400 });

  try {
    const apiRes = await fetchResas({
      type: "populationComposition",
      url: "population/composition/perYear",
      method: "GET",
      params: result.data,
    });
    const res = new Response(apiRes.body, { status: apiRes.status, headers: apiRes.headers });
    res.headers.set("Cache-Control", `public, max-age=${60 * 60 * 24 * 120}`); // 120days
    return res;
  } catch (e) {
    if (e instanceof Error) return NextResponse.json({ error: e.message }, { status: 400 });
    return NextResponse.error();
  }
}
