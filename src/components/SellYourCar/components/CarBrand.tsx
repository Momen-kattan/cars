import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import useBrands from "../../../hooks/useBrands";
import axios from "axios";
interface Props {
  SetCarModel: (e: any) => void;
}

const CarBrand = ({ SetCarModel }: Props) => {
  const {
    data: brands,
    error: errorBrands,
    isLoading: loadBrands,
  } = useBrands();

  const handleChose = async (event: any) => {
    let car_model = await axios.get(
      `https://abdelwahapbak2.pythonanywhere.com/car_model/${event.target.value}`
    );
    SetCarModel(car_model.data);
  };
  return (
    <FormControl>
      <InputLabel id="brand-label" sx={{ fontSize: 20 }}>
        Select your car brand
      </InputLabel>
      <Select
        labelId="brand-label"
        id="brand"
        name="brand"
        onChange={handleChose}
        required
        label="Select your car brand"
        autoComplete="brand"
      >
        {brands?.map((brand: any) => (
          <MenuItem key={brand.name} value={brand.id}>
            {brand.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CarBrand;
