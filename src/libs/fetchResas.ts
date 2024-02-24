import toast from "react-hot-toast";

import { ResasPopulationCompositionOptions } from "../types/resasPopulationCompositionOptions";

import {
  PopulationCompositionResponse,
  PopulationCompositionResponseSchema,
} from "@/types/populationCompositionResponse";
import { PrefecturesResponse, PrefecturesResponseSchema } from "@/types/prefecturesResponse";

type ResasOptions = ResasPrefectureOptions | ResasPopulationCompositionOptions;

type ResasPrefectureOptions = {
  type: "prefectures";
  url: "prefectures";
  method: "GET";
};

if (import.meta.env.VITE_RESAS_API_KEY === undefined) throw new Error("VITE_RESAS_API_KEY is not defined");

// DONT FORGET ERROR HANDLING
export async function fetchResas({ type: _, url: url_path, method, ...rest }: ResasOptions): Promise<unknown> {
  const url = new URL(url_path, "https://opendata.resas-portal.go.jp/api/v1/");
  const params = { ...rest }.params;

  if (params) {
    url.searchParams.set("prefCode", params.prefCode.toString());
    url.searchParams.set("cityCode", params.cityCode ?? "-");
    if (params.addArea) url.searchParams.set("addArea", JSON.stringify(params.addArea));
  }

  const headers = new Headers();
  headers.append("X-API-KEY", import.meta.env.VITE_RESAS_API_KEY as string);

  const res = await fetch(new Request(url, { headers, method }));

  if (res.ok === false) {
    if (res.status === 429) {
      toast.error("APIの利用制限にかかりました。しばらく時間をおいてから再度お試しください。");
      return {};
    }
    toast(`fetchResas: ${res.status} ${res.statusText}`);
    throw new Error(`fetchResas: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

// DONT FORGET ERROR HANDLING
export async function fetchPrefectures(): Promise<PrefecturesResponse> {
  // pass error
  const data = await fetchResas({
    type: "prefectures",
    url: "prefectures",
    method: "GET",
  });

  // pass error
  return await PrefecturesResponseSchema.parse(data);
}

// DONT FORGET ERROR HANDLING
export async function fetchPopulationComposition(
  params: ResasPopulationCompositionOptions["params"]
): Promise<PopulationCompositionResponse> {
  if (params.cityCode == undefined) params.cityCode = "-";
  // pass error
  const data = await fetchResas({
    type: "populationComposition",
    url: "population/composition/perYear",
    method: "GET",
    params,
  });

  // pass error
  return PopulationCompositionResponseSchema.parse(data);
}
