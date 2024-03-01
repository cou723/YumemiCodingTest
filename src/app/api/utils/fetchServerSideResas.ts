import { ResasPopulationCompositionOptions } from "@/types/resasPopulationCompositionOptions";

type ResasOptions = ResasPrefectureOptions | ResasPopulationCompositionOptions;

type ResasPrefectureOptions = {
  type: "prefectures";
  url: "prefectures";
  method: "GET";
};

if (process.env.VITE_RESAS_API_KEY === undefined) throw new Error("VITE_RESAS_API_KEY is not defined");

export async function fetchResas({ type: _, url: url_path, method, ...rest }: ResasOptions): Promise<Response> {
  const url = new URL(url_path, "https://opendata.resas-portal.go.jp/api/v1/");
  const params = { ...rest }.params;

  if (params) {
    url.searchParams.set("prefCode", params.prefCode.toString());
    url.searchParams.set("cityCode", params.cityCode ?? "-");
    if (params.addArea) url.searchParams.set("addArea", JSON.stringify(params.addArea));
  }

  const headers = new Headers();
  headers.append("X-API-KEY", process.env.VITE_RESAS_API_KEY as string);

  return await fetch(new Request(url, { headers, method }));
}
