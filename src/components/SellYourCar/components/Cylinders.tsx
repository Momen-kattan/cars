import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import React from "react";

interface Props {
  value: string;
  handle: (e: any) => void;
}

const Cylinders = ({ value, handle }: Props) => {
  const cylinders = ["V2", "V4", "V6", "V8", "V10", "V12"];
  return (
    <FormControl>
      <InputLabel id="cylinders-label" sx={{ fontSize: 20 }}>
        add your motor Cylinders
      </InputLabel>
      <Select
        labelId="cylinders-label"
        id="cylinders"
        name="cylinders"
        value={value}
        onChange={handle}
        label="Cylinders"
        renderValue={(selected) => selected || "Select cylinders"}
      >
        {cylinders.map((c) => (
          <MenuItem value={c}>{c}</MenuItem>
        ))}
        {/* <MenuItem value="V2">V2</MenuItem>
        <MenuItem value="V4">V4</MenuItem>
        <MenuItem value="V6">V6</MenuItem>
        <MenuItem value="V8">V8</MenuItem>
        <MenuItem value="V10">V10</MenuItem>
        <MenuItem value="V12">V12</MenuItem> */}
      </Select>
    </FormControl>
  );
};

export default Cylinders;
