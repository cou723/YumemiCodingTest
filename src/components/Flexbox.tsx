import React from "react";

import { Box } from "@mui/material";

type Props = {
  children?: React.ReactNode;
  gap?: number | string;
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  flexDirection?: React.CSSProperties["flexDirection"];
  flexWrap?: React.CSSProperties["flexWrap"];
  [key: string]: unknown;
};

const FlexBox = ({
  children,
  gap,
  justifyContent,
  alignItems,
  flexDirection,
  flexWrap,
  ...props
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: typeof gap === "number" ? `${gap}rem` : gap,
        justifyContent,
        alignItems,
        flexDirection,
        flexWrap,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FlexBox;
