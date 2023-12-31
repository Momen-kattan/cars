import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router";
import { Loader } from "./Loader";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          (Motors and more)
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          the best way to find your dream car
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained">Join an auction</Button>
          <Button variant="outlined">later action</Button>
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/Calendar");
            }}
          >
            calender action
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
