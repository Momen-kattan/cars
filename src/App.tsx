import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/LoginUser/Login";
import Form from "./components/Register/Register.Form";
import PopUpLogin from "./components/LoginUser/PopUpLogin";
import SellYourCar from "./components/SellYourCar/SellYourCar";
import { Home } from "./pages/Home";
import SideBar from "./components/SideBar/SideBar";
import Profile from "./components/Profile/Profile";
import MyCars from "./components/MyCars/MyCars";
import InformationMyCar from "./components/InformationMyCar/InformationMyCar";
import AuctionLive from "./components/AuctionLive/AuctionLive";
import { styled } from "@mui/material";
import { keyframes } from "@emotion/react";
import { ArrowBack } from "@mui/icons-material";
import { Suspense } from "react";
import CalenderAuction from "./components/CalenderAuction/CalenderAuction";
import Auctions from "./components/Auctions/Auctions";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledBox = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f9f9f9",
  color: "#333",
  animation: `${fadeIn} 1s ease-in-out`,
  "& .title": {
    fontSize: "6rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#333",
    textShadow: "2px 2px 0px #fff",
  },
  "& .subtitle": {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#333",
    textShadow: "1px 1px 0px #fff",
  },
  "& .text": {
    fontSize: "1.5rem",
    fontWeight: "normal",
    marginBottom: "2rem",
    textAlign: "center",
    maxWidth: "80%",
  },

  "& .button": {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#333",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    marginTop: "2rem",
    boxShadow: "2px 2px 0px #777",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
});

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <StyledBox>
      <Typography variant="h1" className="title">
        404
      </Typography>
      <Typography variant="h2" className="subtitle">
        Oops! Page not found
      </Typography>

      <Typography variant="body1" className="text">
        We're sorry, but the page you're looking for cannot be found. It may
        have been removed, renamed, or is temporarily unavailable. Please check
        the URL again. or click the button to go to home.
      </Typography>
      <Button variant="contained" className="button" onClick={handleBackToHome}>
        <ArrowBack />
        Back to Home
      </Button>
    </StyledBox>
  );
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<SideBar />}>
        <Route path="" element={<Home />} />
        <Route path="/MyCars" element={<MyCars />} />
        <Route path="/AuctionLive/:id" element={<AuctionLive />} />
        <Route path="/informationMyCar/:id" element={<InformationMyCar />} />
        <Route path="/Auctions/:id" element={<Auctions />} />
        <Route path="/Register" element={<Form />} />
        <Route path="/Calendar" element={<CalenderAuction />} />
        <Route path="/LoginPOP" element={<PopUpLogin />} />
        <Route path="/SellYourCar" element={<SellYourCar />} />
        <Route path="/Profile" element={<Profile />} />
        <Route
          path="/Login"
          element={
            <Login
              setOpen={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
export default App;
