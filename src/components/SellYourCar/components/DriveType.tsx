import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
interface Props {
  handle: (e: any) => void;
}
const DriveType = ({ handle }: Props) => {
  const drive_type = [
    { shourts: "FWD", label: "(FWD) Front-wheel drive" },
    { shourts: "RWD", label: "(RWD) Rear-wheel drive" },
    { shourts: "AWD", label: "(AWD) All-wheel driv" },
    { shourts: "4WD", label: "(4WD) Four-wheel drive" },
  ];
  return (
    <FormControl>
      <InputLabel id="drive type" sx={{ fontSize: 20 }}>
        Select your drive type
      </InputLabel>
      <Select
        labelId="drive_type"
        id="drive_type"
        name="drive_type"
        onChange={handle}
        required
        label="Select your drive type"
        autoComplete="drive type"
      >
        {drive_type.map((drive, index) => (
          <MenuItem key={index} value={drive["shourts"]}>
            {drive["label"]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DriveType;
