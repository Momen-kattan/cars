import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
interface Props {
  value: string;
  handle: (e: any) => void;
}
const EngineCapacity = ({ value, handle }: Props) => {
  const engines = [
    "1.0",
    "1.2",
    "1.4",
    "1.6",
    "1.8",
    "2.0",
    "2.2",
    "2.4",
    "2.5",
    "2.7",
    "3.0",
    "3.2",
    "3.5",
    "3.6",
    "4.0",
    "4.5",
    "4.6",
    "5.0",
    "5.2",
    "5.4",
    "5.7",
    "6.0",
    "6.2",
    "6.4",
    "6.6",
    "6.7",
    "7.0",
    "7.2",
  ];
  return (
    <FormControl variant="outlined">
      <InputLabel sx={{ fontSize: 20 }}>Choose your engine capacity</InputLabel>
      <Select
        labelId="engine_capacity"
        id="engine_capacity"
        name="engine_capacity"
        value={value}
        onChange={handle}
        required
        label="engine_capacity"
        autoComplete="engine_capacity"
      >
        {engines.map((e) => (
          <MenuItem value={e}>{e}-liter engine</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EngineCapacity;
