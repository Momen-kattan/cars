import {
  Box,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Link } from "react-router-dom";
import useCar from "../../hooks/useMyCar";
import imageNotFound from "./../../../dist/assets/notFound2-540c3920.png";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import PopUP from "./PopUP";
import { Loader } from "../Loader";
interface MyCarS {
  id: number;
  car_models: string;
  price: number;
  images: string[];
}

const Card = ({ car_models, price, images, id }: MyCarS) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      {images.length === 0 ? (
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
      <IconButton style={{ position: "absolute", top: 0, right: 0 }}>
        <ClearIcon onClick={handleClickOpen} />
        <Dialog open={open} onClose={handleClose}>
          <PopUP setOpen={handleClose} car_id={id} />
        </Dialog>
      </IconButton>
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
  const { data, error, isFetching, isLoading } = useCar();
  const handle = (data: {}) => {
    console.log(data);
  };
  if (isLoading) return <Loader />;
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
