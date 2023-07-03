import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "./components/Footer/Footer.Home";
import NavBar from "./components/NavBar";
import { AppComponent } from "./AppComponent";
import HeroSection from "./components/HeroSection";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#202124",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* <ProSidebarProvider> */}
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <App />
          <Footer />
          <ReactQueryDevtools />
        </ThemeProvider>
        {/* </ProSidebarProvider> */}
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
