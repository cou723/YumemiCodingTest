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

// DONT FORGET ERROR HANDLING
export async function fetchApi({ type: _, url: url_path, method, ...rest }: ResasOptions): Promise<unknown> {
  console.log("api/" + url_path, window.location.origin);
  const url = new URL("api/" + url_path, window.location.origin);
  console.log(url);
  const params = { ...rest }.params;

  if (params) {
    url.searchParams.set("prefCode", params.prefCode.toString());
    url.searchParams.set("cityCode", params.cityCode ?? "-");
    if (params.addArea) url.searchParams.set("addArea", JSON.stringify(params.addArea));
  }

  const res = await fetch(
    new Request(url, {
      method,
    })
  );
  return await res.json();
}

// DONT FORGET ERROR HANDLING
export async function fetchPrefectures(): Promise<PrefecturesResponse> {
  // pass error
  const data = await fetchApi({
    type: "prefectures",
    url: "prefectures",
    method: "GET",
  });

  console.log(data);

  // pass error
  return await PrefecturesResponseSchema.parse(data);
}

// DONT FORGET ERROR HANDLING
export async function fetchPopulationComposition(
  params: ResasPopulationCompositionOptions["params"]
): Promise<PopulationCompositionResponse> {
  if (params.cityCode == undefined) params.cityCode = "-";
  // pass error
  const data = await fetchApi({
    type: "populationComposition",
    url: "population/composition/perYear",
    method: "GET",
    params,
  });

  // pass error
  return PopulationCompositionResponseSchema.parse(data);
}
