import { Box } from "@mui/material";
import { Outlet, Route, Routes } from "react-router-dom";

import Login from "./components/LoginUser/Login";
import Form from "./components/Register/Register.Form";
import SliderBar from "./components/SliderBar";
import PopUpLogin from "./components/LoginUser/PopUpLogin";
import SellYourCar from "./components/SellYourCar/SellYourCar";
import { ViewCarouselTwoTone } from "@mui/icons-material";
import { MainLayout } from "./MainLayout";
import { AppComponent } from "./AppComponent";
import NewLogin from "./pages/Login";
import Regist from "./pages/Regist";
import { Home } from "./pages/Home";
import SideBar from "./components/SideBar/SideBar";
import Profile from "./components/Profile/Profile";
import useProfile, { UserProfile } from "./hooks/useAuth";
import { useState } from "react";
import MyCars from "./components/MyCars/MyCars";
import InformationMyCar from "./components/InformationMyCar/InformationMyCar";
const ErrorPage = () => "page not found ";
function App() {
  // const { data, error, isLoading } = useProfile();
  const [Auth, setAuth] = useState<boolean>(true);
  // if (typeof data === undefined) {
  //   setAuth(false);
  // }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SideBar />
          // Auth === false ? <SideBar /> : <SideBar myInformmation={data} />
        }
      >
        <Route path="" element={<Home />} />
        <Route path="/MyCars" element={<MyCars />} />
        <Route path="/informationMyCar/:id" element={<InformationMyCar />} />
        {/* <Route path="/login" element={<NewLogin />} /> */}
        <Route path="/regist" element={<Regist />} />
        {/* <Route path="/home" element={<SliderBar />} /> */}
        <Route path="/Register" element={<Form />} />
        {/* <Route path='/Sell_your_car' element={<Login/>}/> */}
        <Route path="/LoginPOP" element={<PopUpLogin />} />
        <Route path="/SellYourCar" element={<SellYourCar />} />
      </Route>
      {/* <Route path="/Profile" element={<Profile />} /> */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
