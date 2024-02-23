import React from "react";

import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import toast from "react-hot-toast";

import { usePopulationComposition } from "@/hooks/usePopulationComposition";
import { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import { Prefecture } from "@/types/prefecture";

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
    <FormControlLabel
      control={isLoading ? <CircularProgress /> : <Checkbox onChange={(e) => handleChange(e)} />}
      label={prefecture.prefName}
    />
  );
};

export default PrefectureCheckbox;
