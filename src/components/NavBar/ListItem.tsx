import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PopUpLogin from "../LoginUser/PopUpLogin";

const ListItem = () => {
  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <IconButton size="large" color="inherit">
        <Badge color="error">
          <LightModeOutlinedIcon />
        </Badge>
      </IconButton>

      <PopUpLogin />
    </Box>
  );
};

export default ListItem;
