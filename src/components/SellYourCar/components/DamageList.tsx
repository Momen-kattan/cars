import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
interface Props {
  value: any;
  clean_title: string;
  SetValue: (e: any) => void;
  damageState: string;
  SetDamageState: (e: any) => void;
}
const DamageList = ({
  value,
  SetValue,
  clean_title,
  SetDamageState,
  damageState,
}: Props) => {
  const handelAddDamageString = (event: any, setter?: Function) => {
    const value = event.target.value;

    SetDamageState(damageState + value[0]);
    setter?.((values: { damage: string }) => ({
      ...values,
      damageList: value,
    }));
  };
  const damages = [
    "Front-end damage ",
    "Rear-end damage ",
    "Side-impact damage ",
    "Fender-bender damage ",
    "Door damage ",
    "Bumper damage ",
    "Hail damage ",
    "Scratches and dents ",
    "Broken windows",
    "Structural damage",
    "sunken car",
  ];

  return (
    <FormControl>
      <InputLabel id="damage-label" sx={{ fontSize: 20 }}>
        Select your car damages
      </InputLabel>
      <Select
        labelId="damage-label"
        id="damageList"
        name="damageList"
        multiple
        value={value}
        onChange={(e) => handelAddDamageString(e, SetValue)}
        label="Select damages"
        disabled={clean_title === "false" ? false : true}
      >
        {damages.map((d) => (
          <MenuItem value={d}>{d}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DamageList;
