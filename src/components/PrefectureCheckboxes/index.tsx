import React, { useState } from "react";

import { Box } from "@mui/material";

import PrefectureCheckbox from "@/components/PrefectureCheckboxes/PrefectureCheckbox";
import { PopulationCompositions } from "@/types/populationCompositions";
import { Prefecture } from "@/types/prefecture";

type Props = {
  prefectures: Prefecture[];
  onChange: (datum: PopulationCompositions) => void;
};

const PrefectureCheckboxes: React.FC<Props> = ({ prefectures, onChange }) => {
  const [prefectureDatum, setPrefectureDatum] =
    useState<PopulationCompositions>([]);

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
            if (data) {
              setPrefectureDatum([
                ...prefectureDatum,
                { label: prefecture, data },
              ]);
              onChange([...prefectureDatum, { label: prefecture, data }]);
            }
            if (error) {
              // TODO: エラー時の処理
              console.error(error);
            }
          }}
        />
      ))}
    </Box>
  );
};

export default PrefectureCheckboxes;
