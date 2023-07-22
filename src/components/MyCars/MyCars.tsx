import { Box, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ViewCarousel } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useCar, { Car } from "../../hooks/useMyCar";
import imageNotFound from "./../../images/notFound2.png";
import { width } from "@mui/system";
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
interface MyCarS {
  id: number;
  car_models: string;
  price: number;
  images: string[];
}

const Card = ({ car_models, price, images, id }: MyCarS) => {
  console.log("sssssssssssssssssssss");
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
      {!images ? (
        <div>
          <Box
            style={{
              backgroundSize: "cover",

              height: "200px",
              backgroundImage: `url(${imageNotFound})`,
            }}
          ></Box>
        </div>
      ) : (
        <Slide>
          {images.map((slideImage) => (
            <div>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "200px",
                  backgroundImage: `url(${slideImage})`,
                }}
              ></Box>
            </div>
          ))}
        </Slide>
      )}

      <Link
        to={"/InformationMyCar/" + id}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Stack sx={{ py: 1, px: 2 }}>
          <Typography>{car_models}</Typography>
          <Typography>{price}</Typography>
        </Stack>
      </Link>
    </Box>
  );
};
const MyCars = () => {
  const { data, error } = useCar();
  // if (error) {
  //   return <p>error in data</p>;
  // }
  const handle = (data: {}) => {
    console.log(data);
  };
  return (
    <Box sx={{ flexGrow: 1, mx: 5 }}>
      <Grid container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data?.map((car) => (
          <Grid item xs={3} onClick={() => handle(car)}>
            <Card
              id={car.id}
              car_models={car.car_model}
              images={car.images}
              price={car.price}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyCars;
