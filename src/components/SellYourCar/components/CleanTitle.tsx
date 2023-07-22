import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

interface Props {
  value: string;
  handle: (e: any) => void;
}

const CleanTitle = ({ value, handle }: Props) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Clean title:</FormLabel>
      <RadioGroup
        aria-label="clean_title"
        name="clean_title"
        value={value}
        onChange={handle}
        row
      >
        <FormControlLabel
          required
          value={true}
          control={<Radio />}
          label="Yes"
        />
        <FormControlLabel
          required
          value={false}
          control={<Radio />}
          label="No"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default CleanTitle;
