import { Outlet, redirect, useNavigate } from "react-router";
import Sidebar from "./components/SideBar/SideBar";
import Footer from "./components/Footer/Footer.Home";
import { Box } from "@mui/system";
export const MainLayout = () => {
  return (
    <div className="app">
      <main className="content">
        <Sidebar />

        <Box ml="50px">
          <Outlet />
        </Box>
        <Footer />
      </main>
    </div>
  );
};
