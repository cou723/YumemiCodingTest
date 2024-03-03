import React from "react";

import toast from "react-hot-toast";

import { usePopulationComposition } from "@/hooks/usePopulationComposition";
import { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import styles from "./PrefectureCheckbox.module.css";
import { Prefecture } from "@/types/prefecture";
import CircularProgress from "@/components/PrefectureCheckboxes/CircularProgress";

type Props = {
  prefecture: Prefecture;
  onChange: (data: PopulationCompositionResponse["result"] | undefined) => void;
};

const PrefectureCheckbox: React.FC<Props> = ({ prefecture, onChange }) => {
  const { data, isLoading, error } = usePopulationComposition(prefecture.prefCode);
  if (error) toast.error(`${prefecture.prefName}の人口構成の取得に失敗しました`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked ? data?.result : undefined);
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className={styles.box}>
          <input
            name={prefecture.prefCode.toString()}
            type="checkbox"
            onChange={(e) => handleChange(e)}
            disabled={!!error}
          />
          <label htmlFor={prefecture.prefCode.toString()}>{prefecture.prefName}</label>
        </div>
      )}
    </div>
  );
};

export default PrefectureCheckbox;