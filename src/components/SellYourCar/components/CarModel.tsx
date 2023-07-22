import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
interface Props {
  handle: (e: any) => void;
  carModels: [];
}

const CarModel = ({ handle, carModels }: Props) => {
  return (
    <FormControl>
      <InputLabel id="Model-label" sx={{ fontSize: 20 }}>
        Select your car Model
      </InputLabel>
      <Select
        labelId="car_model-label"
        id="car_models"
        name="car_models"
        onChange={handle}
        required
        label="Select your car Model"
        autoComplete="Model"
      >
        {carModels?.map((car_models: any) => (
          <MenuItem key={car_models.name} value={car_models.id}>
            {car_models.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CarModel;
