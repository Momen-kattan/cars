import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

interface Props {
  value: string;
  handle: (e: any) => void;
}
const ManufacturingYear = ({ value, handle }: Props) => {
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  return (
    <FormControl variant="outlined">
      <InputLabel id="manufacturing_year_label" sx={{ fontSize: 20 }}>
        Manufacturing Year of car
      </InputLabel>
      <Select
        labelId="manufacturing_year_label"
        id="manufacturing_year"
        value={value}
        onChange={handle}
        name="manufacturing_year"
        label="Manufacturing Year"
        renderValue={(selected) => selected || "Select Year"}
      >
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ManufacturingYear;
