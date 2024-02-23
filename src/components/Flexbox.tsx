import React from "react";

import { Box } from "@mui/material";

type Props = {
  children?: React.ReactNode;
  gap?: number | string;
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  flexDirection?: React.CSSProperties["flexDirection"];
  flexWrap?: React.CSSProperties["flexWrap"];
  sx?: React.CSSProperties;
  [key: string]: unknown;
};

const FlexBox = ({ children, gap, justifyContent, alignItems, flexDirection, flexWrap, sx, ...props }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: typeof gap === "number" ? `${gap}rem` : gap,
        justifyContent,
        alignItems,
        flexDirection,
        flexWrap,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FlexBox;
