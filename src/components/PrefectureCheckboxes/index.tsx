import React, { useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import FlexBox from "@/components/Flexbox";
import PrefectureCheckbox from "@/components/PrefectureCheckboxes/PrefectureCheckbox";
import { PopulationComposition } from "@/types/populationCompositions";
import { Prefecture } from "@/types/prefecture";

type Props = {
  isLoading: boolean;
  prefectures?: Prefecture[];
  onChange: (datum: PopulationComposition[]) => void;
};

const PrefectureCheckboxes: React.FC<Props> = ({ isLoading, prefectures = [], onChange }) => {
  const [prefectureDatum, setPrefectureDatum] = useState<PopulationComposition[]>([]);

  if (isLoading)
    return (
      <FlexBox justifyContent="center" sx={{ padding: "32px" }}>
        <CircularProgress />
      </FlexBox>
    );

  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%", flexWrap: "wrap" }}>
      {prefectures.map((prefecture, i) => (
        <PrefectureCheckbox
          key={i}
          prefecture={prefecture}
          onChange={(data) => {
            if (data) {
              const updatedPrefectureDatum = [...prefectureDatum, { label: prefecture, data }];
              setPrefectureDatum(updatedPrefectureDatum);
              onChange(updatedPrefectureDatum);
            } else {
              const updatePrefectureDatum = prefectureDatum.filter((d) => d.label.prefCode !== prefecture.prefCode);
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
