import React from "react";

import toast from "react-hot-toast";

import styles from "./PrefectureCheckbox.module.css";

import type { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import type { Prefecture } from "@/types/prefecture";

import CircularProgress from "@/components/PrefectureCheckboxes/CircularProgress";
import { usePopulationComposition } from "@/hooks/usePopulationComposition";

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
      <div className={styles.box}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <input
            id={prefecture.prefCode.toString()}
            type="checkbox"
            onChange={(e) => handleChange(e)}
            disabled={!!error}
          />
        )}

        <label htmlFor={prefecture.prefCode.toString()}>{prefecture.prefName}</label>
      </div>
    </div>
  );
};

export default PrefectureCheckbox;
