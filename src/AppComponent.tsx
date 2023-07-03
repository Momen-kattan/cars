import { Box, Button, ButtonBase, Stack, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer/Footer.Home";
import ApiIcon from "@mui/icons-material/Api";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SliderBar from "./components/SliderBar";
import NavBar from "./components/NavBar";
import SearchPart from "./components/NavBar/SearchPart";
import myLogo from "./Logo.png";
import axios from "axios";
import { Sidebar } from "react-pro-sidebar";

export const AppComponent = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "100vh", overflow: "hidden", pb: 5 }}>
      <Stack
        sx={{
          py: 1,
          px: 5,
          backgroundColor: (t) => t.palette.primary.main,
        }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack
          gap={2}
          sx={{ px: 2, borderRadios: 3 }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          component={ButtonBase}
          onClick={() => navigate("/")}
        >
          <ApiIcon sx={{ color: "blue", fontSize: 40 }} />
          <Typography variant="h6" color="white">
            Motors and more
          </Typography>
          <SearchPart />
        </Stack>
        <Stack
          gap={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            onClick={() => navigate("/login")}
            endIcon={<VpnKeyIcon />}
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/regist")}
            endIcon={<HowToRegIcon />}
            variant="contained"
            color="secondary"
          >
            Regist
          </Button>
        </Stack>
      </Stack>
      <Outlet />
    </Box>
  );
};
