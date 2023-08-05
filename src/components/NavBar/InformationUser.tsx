import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import useProfile from "../../hooks/useAuth";
import profile from "../../store";
import { useQueryClient } from "@tanstack/react-query";
import Badge from "@mui/material/Badge";
import axios from "axios";
import NotificationsIcon from "@mui/icons-material/Notifications";

const InformationUser = () => {
  const setProfile = profile((s) => s.fetchProfile);

  const navigate = useNavigate();
  const client = useQueryClient();
  const settings = ["Profile", "Account", "Logout"];
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNote, setAnchorElNote] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenNoteMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNote(event.currentTarget);
  };
  const handleCloseNoteMenu = () => {
    setAnchorElNote(null);
  };
  const { data } = useProfile();
  const handleCloseUserMenu = () => {
    localStorage.removeItem("token");
    setProfile(null);
    setAnchorElUser(null);
    client.setQueryData(["user_profile"], null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <Box sx={{ flexGrow: 0 }}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          style={{ marginRight: 25 }}
          onClick={handleOpenNoteMenu}
        >
          <Badge badgeContent={10} color="error">
            <NotificationsIcon />
          </Badge>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElNote}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElNote)}
            onClose={() => setAnchorElNote(null)}
            // PaperProps={{
            //   sx: {
            //     width: 200, // Set the desired width for the menu
            //   },
            // }}
          >
            <MenuItem
              onClick={() => {
                navigate("/profile");
              }}
            >
              <Typography textAlign="center">my koko</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNoteMenu}>
              <Typography textAlign="center">logOut</Typography>
            </MenuItem>
          </Menu>
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/2.jpg"
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>
        </Tooltip>
        <Typography style={{ display: "inline", marginLeft: 5 }}>
          {data?.email}
        </Typography>
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
          onClose={() => setAnchorElUser(null)}
        >
          <MenuItem
            onClick={() => {
              navigate("/profile");
            }}
          >
            <Typography textAlign="center">my profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">logOut</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default InformationUser;
