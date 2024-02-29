import { fetchResas } from "@/app/api/utils/fetchServerSideResas";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

const RequestBodySchema = z.object({
  prefCode: z.number(),
  cityCode: z.string(),
});

export async function GET(req: NextApiRequest): Promise<Response> {
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
    return apiRes;
  } catch (e) {
    if (e instanceof Error) return NextResponse.json({ error: e.message }, { status: 500 });
    return NextResponse.error();
  }
}
