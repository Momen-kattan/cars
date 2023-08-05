import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const Loader = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};
