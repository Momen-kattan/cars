import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Login from "./Login";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router";

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
