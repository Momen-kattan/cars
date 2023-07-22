import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
interface Props {
  value: string;
  handle: (e: any) => void;
}
const CarType = ({ value, handle }: Props) => {
  const Type = [
    "COUPE",
    "SPORTS CAR",
    "HATCHBACK",
    "CONVERTIBLE",
    "SUV",
    "MINIVAN",
    "PICKUP",
  ];
  return (
    <FormControl variant="outlined">
      <InputLabel sx={{ fontSize: 20 }}>Select your car type</InputLabel>
      <Select
        labelId="type"
        id="type"
        name="type"
        value={value}
        onChange={handle}
        required
        label="type"
        autoComplete="type"
      >
        {Type.map((t) => (
          <MenuItem value={t}>{t}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CarType;
