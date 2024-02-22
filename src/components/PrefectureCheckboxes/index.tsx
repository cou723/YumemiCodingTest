import React, { useState } from "react";

import { Box } from "@mui/material";

import PrefectureCheckbox from "@/components/PrefectureCheckboxes/PrefectureCheckbox";
import { PopulationComposition } from "@/types/populationCompositions";
import { Prefecture } from "@/types/prefecture";

type Props = {
  prefectures: Prefecture[];
  onChange: (datum: PopulationComposition[]) => void;
};

const PrefectureCheckboxes: React.FC<Props> = ({ prefectures, onChange }) => {
  const [prefectureDatum, setPrefectureDatum] = useState<
    PopulationComposition[]
  >([]);

  return (
    <Box>
      {prefectures.map((prefecture, i) => (
        <PrefectureCheckbox
          key={i}
          prefecture={prefecture}
          onChange={(data, loading, error) => {
            if (loading) {
              // TODO: loading時のUIを返す
              return;
            }
            if (error) {
              // TODO: エラー時の処理
              console.error(error);
            }
            if (data) {
              const updatedPrefectureDatum = [
                ...prefectureDatum,
                { label: prefecture, data },
              ];
              setPrefectureDatum(updatedPrefectureDatum);
              onChange(updatedPrefectureDatum);
            } else {
              const updatePrefectureDatum = prefectureDatum.filter(
                (d) => d.label.prefCode !== prefecture.prefCode,
              );
              setPrefectureDatum(updatePrefectureDatum);
              onChange(updatePrefectureDatum);
            }
          }}
        />
      ))}
    </Box>
  );
};

export default PrefectureCheckboxes;
