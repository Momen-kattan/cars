import HowToRegIcon from "@mui/icons-material/HowToReg";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import { useNavigate } from "react-router";
import Login from "./Login";

export default function PopUpLogin() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "flex", gap: 4, margin: "0.3rem" }}>
      <Button
        onClick={() => navigate("/Register")}
        endIcon={<HowToRegIcon />}
        variant="contained"
        color="secondary"
      >
        Regist
      </Button>
      <Button
        endIcon={<VpnKeyIcon />}
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        LogIn
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <Login setOpen={handleClose} />
      </Dialog>
    </div>
  );
}
