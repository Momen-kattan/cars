import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
interface Props {
  value: string;
  handle: (e: any) => void;
}
const GearType = ({ value, handle }: Props) => {
  const gears = ["Manual", "Automatic", "Easytronic"];
  return (
    <FormControl variant="outlined">
      <InputLabel sx={{ fontSize: 20 }}>Select your gear_type</InputLabel>
      <Select
        labelId="gear_type"
        id="gear_type"
        name="gear_type"
        value={value}
        onChange={handle}
        defaultValue="Automatic"
        required
        label="gear_type"
        autoComplete="gear_type"
      >
        {gears.map((g) => (
          <MenuItem value={g}>{g}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GearType;
