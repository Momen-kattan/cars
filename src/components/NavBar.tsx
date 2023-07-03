import MoreIcon from "@mui/icons-material/MoreVert";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ListItem from "./NavBar/ListItem";
import RenderMobileMenu from "./NavBar/RenderMobileMenu";
import ApiIcon from "@mui/icons-material/Api";
import SearchPart from "./NavBar/SearchPart";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { margin, padding } from "@mui/system";
import image from "./../images/car-logo-png-2320.png";
export default function NavBar() {
  const mobileMenuId = "primary-search-account-menu-mobile";
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        minHight: "100vh",
        overflow: "hidden",
        bgcolor: "Background.paper",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "flex", sm: "block" } }}
        >
          <Typography variant="h6" color="white">
            <Link to={"/"}>
              {/* <ApiIcon sx={{ color: "blue", fontSize: 45 }} /> */}
              <img style={{ width: "3.5em" }} src={image} alt="" />
            </Link>
          </Typography>
        </Typography>
        Motors and more
        <SearchPart />
        <Box sx={{ flexGrow: 1 }} />
        <ListItem />
        <Box sx={{ display: { xs: "raw", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <RenderMobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        setMobileMoreAnchorEl={setMobileMoreAnchorEl}
      />
    </Box>
  );
}
