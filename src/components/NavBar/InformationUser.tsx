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
import { useEffect, useState } from "react";
// import profile from "../../store";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import profile from "../../store";
// import { profile } from "../SideBar/SideBar";
const InformationUser = () => {
  const email = profile((s) => s.email);
  const navigate = useNavigate();
  const settings = ["Profile", "Account", "Logout"];
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    localStorage.removeItem("token");
    profile((s) => s.fetchProfile);
    navigate("/");
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Typography>{email}</Typography>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">logOut</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default InformationUser;
