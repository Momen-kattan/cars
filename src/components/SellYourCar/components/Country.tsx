import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import useCountry from "../../../hooks/useCountry";
import axios from "axios";

interface Props {
  SetProvinece: (e: any) => void;
}
const Country = ({ SetProvinece }: Props) => {
  const {
    data: countrys,
    error: errorCountry,
    isLoading: loadCountry,
  } = useCountry();
  const handleSelect = async (event: any) => {
    let provinece = await axios.get(
      `https://abdelwahapbak2.pythonanywhere.com/province/${event.target.value}`
    );
    SetProvinece(provinece.data);
  };
  return (
    <FormControl>
      <InputLabel id="country-label" sx={{ fontSize: 20 }}>
        Select your country{" "}
      </InputLabel>
      <Select
        labelId="country-label"
        // id="location"
        // name="location"
        onChange={handleSelect}
        required
        label="Select your location"
        autoComplete="location"
      >
        {countrys?.map((country) => (
          <MenuItem key={country.country_name} value={country.id}>
            {country.country_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Country;
