import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import NavBar from "../NavBar";
import { DrawerHeader, closedMixin } from "./utils";
import { Home } from "../../pages/Home";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserProfile } from "../../hooks/useAuth";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import WrapTextIcon from "@mui/icons-material/WrapText";
import { color } from "@mui/system";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { Alert, Button } from "@mui/material";
import { socket } from "../../socket";
import { useEffect, useState } from "react";
export interface profile {
  myInformmation?: UserProfile;
}
const drawerWidth = 220;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#202124",
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface State extends SnackbarOrigin {
  opensnak: boolean;
}

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  const [auctionId, setAuctionID] = useState("");
  const [CanJoin, setCanJoin] = useState(false);

  const [state, setState] = React.useState<State>({
    opensnak: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, opensnak } = state;
  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, opensnak: true });
  };

  const handleClose = () => {
    setState({ ...state, opensnak: false });
  };
  const handeljoin = () => {
    socket.emit("join_auction", { auction_id: parseInt(auctionId) });
    setState({ ...state, opensnak: false });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  function onConnect() {
    setIsConnected(true);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("has_live_auction", (data) => {
      console.log(data);
      setAuctionID(data.auction_id);
      navigate("/AuctionLive/" + data.auction_id);
    });

    socket.on("liveAuctionTime", (data) => {
      setState({
        ...{ vertical: "top", horizontal: "center" },
        opensnak: true,
      });
      setAuctionID(data.auction_id);
    });
    socket.on("can_join", (data) => {
      if (data.can_join === false) {
        setCanJoin(true);
        setState({
          ...{ vertical: "top", horizontal: "center" },
          opensnak: true,
        });
      } else {
        setCanJoin(false);
        navigate("/AuctionLive/" + data.auction_id);
      }
    });
    return () => {
      socket.off("connect", onConnect);
      // getHello();
    };
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <NavBar />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{ backgroundColor: "#202124" }}
        >
          <DrawerHeader sx={{ backgroundColor: "#202124" }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon sx={{ color: "#fff" }} />
              ) : (
                <ChevronLeftIcon sx={{ color: "#fff" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <List sx={{ backgroundColor: "#202124", color: "#fff" }}>
            <Link
              to={"/AuctionLive/" + 0}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  ":hover": { backgroundColor: "#bb8900" },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <LiveTvIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="live auction"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <ListItem
              disablePadding
              sx={{
                display: "block",
                ":hover": { backgroundColor: "#bb8900" },
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <WrapTextIcon sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText
                  primary="previous auctions"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <Link
              to="/Calendar"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  ":hover": { backgroundColor: "#bb8900" },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <CalendarMonthIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="calender auction"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider sx={{ backgroundColor: "#fff" }} />
          <List
            sx={{
              backgroundColor: "#202124",
              color: "#fff",
            }}
          >
            <Link
              to="/SellYourCar"
              style={{
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  ":hover": { backgroundColor: "#bb8900" },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <InboxIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sell your car"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to="/MyCars"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  ":hover": { backgroundColor: "#bb8900" },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <DriveEtaIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="My cars"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
      </Box>
      <Box sx={{ marginLeft: "5vw" }}>
        {/* <Button onClick={handleClick({ vertical: "top", horizontal: "right" })}>
          Top-Right
        </Button> */}
        {/* <h1>{count}</h1> */}
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={opensnak}
          // onClose={handleClose}
          sx={{ marginTop: "4vw" }}
          // message={`The countdown to the auction has begun ${count}`}
          key={vertical + horizontal}
        >
          <Alert
            icon={<DriveEtaIcon color="primary" />}
            sx={{ width: "100%", backgroundColor: "#F7C331", color: "#242424" }}
          >
            {`The countdown to the your live auction has begun `}
            <Button
              variant="contained"
              sx={{ backgroundColor: "#242424", color: "#F7C331" }}
              onClick={handeljoin}
            >
              join
            </Button>
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={CanJoin}
          // onClose={handleClose}
          sx={{ marginTop: "10vw" }}
          // message={`The countdown to the auction has begun ${count}`}
          key={vertical + horizontal}
        >
          <Alert
            icon={<DriveEtaIcon color="primary" />}
            sx={{ width: "100%", backgroundColor: "#ff0000", color: "#242424" }}
          >
            {`The countdown to the your live auction has begun `}
          </Alert>
        </Snackbar>
        <Outlet />
      </Box>
    </>
  );
}
