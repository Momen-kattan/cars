import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Button } from "@mui/material";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import PopUpLogin from "../LoginUser/PopUpLogin";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useStore } from "zustand";
import { useEffect } from "react";
import profile from "../../store";

const ListItem = () => {
  const store = profile((s) => s.email);
  const navigate = useNavigate();
  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <IconButton size="large" color="inherit">
        <Badge color="error">
          <LightModeOutlinedIcon />
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Badge badgeContent={17} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* <Button size="medium" 
              aria-label="show 17 new notifications"
              color="inherit">login</Button> */}
      {/* <Button
        onClick={() => navigate("/Register")}
        endIcon={<HowToRegIcon />}
        variant="contained"
        color="secondary"
      >
        Regist
      </Button> */}

      <PopUpLogin />
    </Box>
  );
};

export default ListItem;
