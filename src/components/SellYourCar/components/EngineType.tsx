import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

interface Props {
  value: string;
  handle: (e: any) => void;
}
const EngineType = ({ value, handle }: Props) => {
  const engine_type = [
    { key: "ESS", label: "Internal petrol combustion engine" },
    { key: "DSL", label: "Diesel internal combustion engine" },
    { key: "BEV", label: "battery electric vehicle" },
    { key: "HEV", label: "Hybrid electric vehicle" },
  ];
  return (
    <FormControl variant="outlined">
      <InputLabel sx={{ fontSize: 20 }}>Select your engine_type</InputLabel>
      <Select
        labelId="engine_type"
        id="engine_type"
        name="engine_type"
        value={value}
        onChange={handle}
        required
        label="engine_type"
        autoComplete="engine_type"
      >
        {engine_type.map((e) => (
          <MenuItem value={e["key"]}>{e["label"]}</MenuItem>
        ))}
        {/* <MenuItem value={"ESS"}>Internal petrol combustion engine</MenuItem>
        <MenuItem value={"DSL"}>Diesel internal combustion engine</MenuItem>
        <MenuItem value={"BEV"}>battery electric vehicle</MenuItem>
        <MenuItem value={"HEV"}>Hybrid electric vehicle</MenuItem> */}
      </Select>
    </FormControl>
  );
};

export default EngineType;
