import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

interface Props {
  handle: (e: any) => void;
  Provinece: [];
}
const Province = ({ Provinece, handle }: Props) => {
  return (
    <FormControl>
      <InputLabel id="province-label" sx={{ fontSize: 20 }}>
        Select your province{" "}
      </InputLabel>
      <Select
        labelId="province-label"
        id="location"
        name="location"
        onChange={handle}
        required
        label="Select your location"
        autoComplete="location"
      >
        {Provinece?.map((province: any) => (
          <MenuItem key={province.province_name} value={province.id}>
            {province.province_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Province;
