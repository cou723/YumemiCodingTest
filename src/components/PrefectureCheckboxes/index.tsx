import React, { useState } from "react";

import PrefectureCheckbox from "@/components/PrefectureCheckboxes/PrefectureCheckbox";
import { PopulationComposition } from "@/types/populationCompositions";
import { Prefecture } from "@/types/prefecture";
import styles from "./PrefectureCheckboxes.module.css";
import CircularProgress from "@/components/PrefectureCheckboxes/CircularProgress";

type Props = {
  isLoading: boolean;
  prefectures?: Prefecture[];
  onChange: (datum: PopulationComposition[]) => void;
};

const PrefectureCheckboxes: React.FC<Props> = ({ isLoading, prefectures = [], onChange }) => {
  const [prefectureDatum, setPrefectureDatum] = useState<PopulationComposition[]>([]);

  if (isLoading)
    return (
      <div className={styles.loading_container}>
        <CircularProgress />
      </div>
    );

  return (
    <div className={styles.box}>
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
    </div>
  );
};

export default PrefectureCheckboxes;
