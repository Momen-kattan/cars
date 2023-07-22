import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import { green, blue, yellow, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import useMainSection from "../../../hooks/useMainSection";
interface Props {
  values: any;
  setValues: (e: any) => void;
}
const MainSection = ({ setValues, values }: Props) => {
  const {
    data: mainSection,
    error: errorMainSection,
    isLoading: loadMainSection,
  } = useMainSection();

  const handleMainSectionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    values: any,
    id: number,
    setter?: Function
  ) => {
    const value = event.target.value;
    // if (values.technical_condition.find((t) => t["state"])) {
    // }
    setter?.(
      (values: { technical_condition: { id: number; state: string }[] }) => ({
        ...values,
        technical_condition: [
          ...values.technical_condition,
          { id: id, state: value },
        ],
      })
    );
  };
  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        border: "1px solid",
        borderColor: "grey.500",
        borderRadius: "4px",
      }}
    >
      {mainSection?.map((section) => (
        <FormControl key={section.id} component="fieldset" variant="outlined">
          <FormLabel component="legend">{section.name}</FormLabel>
          <RadioGroup
            aria-label={`technical_condition_${section.id}`}
            name={`technical_condition_${section.id}`}
            value={values.technical_condition[section.id]}
            onChange={(e) =>
              handleMainSectionChange(e, values, section.id, setValues)
            }
            row
          >
            <FormControlLabel
              required
              value="VG"
              control={
                <Radio
                  sx={{
                    color: green[400],
                    "&.Mui-checked": {
                      color: green[300],
                    },
                  }}
                />
              }
              label="very good"
            />
            <FormControlLabel
              required
              value="G"
              control={
                <Radio
                  sx={{
                    color: blue[400],
                    "&.Mui-checked": {
                      color: blue[300],
                    },
                  }}
                />
              }
              label="good"
            />
            <FormControlLabel
              required
              value="UK"
              control={
                <Radio
                  sx={{
                    color: yellow[400],
                    "&.Mui-checked": {
                      color: yellow[300],
                    },
                  }}
                />
              }
              label="unknown"
            />
            <FormControlLabel
              required
              value="B"
              control={
                <Radio
                  sx={{
                    color: red[400],
                    "&.Mui-checked": {
                      color: red[300],
                    },
                  }}
                />
              }
              label="bad"
            />
          </RadioGroup>
          <Divider />
        </FormControl>
      ))}
    </Box>
  );
};

export default MainSection;
