import { Box, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import HeroSection from "../components/HeroSection";
import { ViewCarousel } from "@mui/icons-material";
import SearchPart from "../components/NavBar/SearchPart";

const slideImages = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/2010_Hyundai_Genesis_Coupe_3_--_08-28-2009.jpg/400px-2010_Hyundai_Genesis_Coupe_3_--_08-28-2009.jpg",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/AudiS_five.jpg/400px-AudiS_five.jpg",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/2013_Mercedes-Benz_SL_550_vf.jpg/400px-2013_Mercedes-Benz_SL_550_vf.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1547038577-da80abbc4f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=755&q=80",
  },

  {
    url: "https://images.unsplash.com/photo-1542228262-3d663b306a53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
  },
];

const Card = () => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 5,
        overflow: "hidden",
        mb: 5,
        boxShadow: 3,
        "&:hover": {
          transform: "scale(1.2)",
        },
        transition: "all 1s ease-out",
      }}
    >
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <Box
              style={{
                backgroundSize: "cover",
                height: "200px",
                backgroundImage: `url(${slideImage.url})`,
              }}
            ></Box>
          </div>
        ))}
      </Slide>
      <Stack sx={{ py: 1, px: 2 }}>
        <Typography>Title</Typography>
        <Typography>Description</Typography>
      </Stack>
    </Box>
  );
};

export const Home = () => {
  return (
    <div style={{ width: "100%" }}>
      <HeroSection />
      <Slide>
        <Box sx={{ flexGrow: 1, mx: 5 }}>
          <Grid container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={3}>
              <Card />
            </Grid>
            <Grid item xs={3}>
              <Card />
            </Grid>
            <Grid item xs={3}>
              <Card />
            </Grid>
            <Grid item xs={3}>
              <Card />
            </Grid>
          </Grid>
        </Box>
      </Slide>
    </div>
  );
};
