import type { PopulationComposition } from "../types/populationCompositions";

/**
 * 人口構成データから分類ラベル(総人口、年少人口、老年人口 etc...)を抽出する
 * @param populationCompositions 対象となる人口構成データ
 * @returns 分類ラベルの配列
 */

export function extractPopulationCompositionsLabel(populationCompositions: PopulationComposition[]): string[] {
  return Array.from(
    /* 重複を削除 */
    new Set(
      populationCompositions
        .map((perPrefecture) => {
          return perPrefecture.data.data.map((data) => data.label) ?? [];
        })
        .flat()
    )
  );
}
