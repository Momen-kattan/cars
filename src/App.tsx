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
const ErrorPage = () => "page not found ";
function App() {
  return (
    <Routes>
      <Route path="/" element={<SideBar />}>
        <Route path="" element={<Home />} />
        {/* <Route path="/login" element={<NewLogin />} /> */}
        <Route path="/regist" element={<Regist />} />
        {/* <Route path="/home" element={<SliderBar />} /> */}
        <Route path="/Register" element={<Form />} />
        {/* <Route path='/Sell_your_car' element={<Login/>}/> */}
        <Route path="/LoginPOP" element={<PopUpLogin />} />
        <Route path="/SellYourCar" element={<SellYourCar />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
