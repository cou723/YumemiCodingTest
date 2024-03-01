import { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import { http, HttpResponse } from "msw";
import { PrefecturesResponse } from "@/types/prefecturesResponse";

export const handlers = [
  http.get("api/prefectures", () => {
    const resData: PrefecturesResponse = { result: [{ prefCode: 1, prefName: "test県" }] };
    return HttpResponse.json(resData);
  }),
  http.get("api/population/composition/perYear", () => {
    const resData: PopulationCompositionResponse = { result: { data: [], boundaryYear: 2020 } };
    return HttpResponse.json(resData);
  }),
];
