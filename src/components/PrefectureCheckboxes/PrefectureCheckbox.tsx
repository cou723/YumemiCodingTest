import React from "react";

import { Checkbox, FormControlLabel } from "@mui/material";

import { usePopulationComposition } from "@/hooks/usePopulationComposition";
import { PopulationCompositionResponse } from "@/types/populationCompositionResponse";
import { Prefecture } from "@/types/prefecture";

type Props = {
  prefecture: Prefecture;
  onChange: (
    data: PopulationCompositionResponse["result"] | undefined,
    isLoading: boolean,
    error: unknown,
  ) => void;
};

const PrefectureCheckbox: React.FC<Props> = ({ prefecture, onChange }) => {
  const { data, isLoading, error } = usePopulationComposition(
    prefecture.prefCode,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked ? data?.result : undefined, isLoading, error);
  };

  return (
    <FormControlLabel
      control={<Checkbox onChange={(e) => handleChange(e)} />}
      label={prefecture.prefName}
    />
  );
};

export default PrefectureCheckbox;
