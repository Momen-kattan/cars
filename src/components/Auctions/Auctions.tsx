import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Link, useParams } from "react-router-dom";
import imageNotFound from "./../../images/notFound2.png";

import { Loader } from "../Loader";
import useCarAuction from "../../hooks/useCarAuction";
import axiosInstance from "../../services/APIClient";
import { autoBatchEnhancer } from "@reduxjs/toolkit";
import { useMutation } from "@tanstack/react-query";
interface MyCarS {
  id: number;
  car_models: string;
  price: number;
  images: string[];
}

const Card = ({ car_models, price, images, id }: MyCarS) => {
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

const Auctions = () => {
  const { id } = useParams();
  const { data: auction, isLoading } = useCarAuction(id!);
  const {
    mutate: handleSubmit,
    status,
    error,
  } = useMutation({
    mutationFn: async (values: any) => {
      await axiosInstance.post("/request_join_auction", {
        auction_id: id,
      });
    },
  });
  // const handlejoinAuction = async () => {
  //   axiosInstance.post("/request_join_auction", {
  //     auction_id: id,
  //   });
  // };

  const handle = (data: {}) => {};
  if (isLoading) return <Loader />;
  return (
    <Box>
      {auction &&
      auction.length > 0 &&
      auction[0].auction_status === "later auction" ? (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              px: 3,
              py: 2,
              borderRadius: 5,
              boxShadow: 3,
              backgroundColor: "#242424",
              color: "white",
              margin: "2.5rem",
              justifyContent: "flex-start",
              "&:hover": {
                backgroundColor: "#bb8900",
              },
            }}
            onClick={handleSubmit}
          >
            Join Auction
          </Button>
          {(error as string) && (
            <Alert severity="error">
              {(error as { message: string }).message as string}{" "}
            </Alert>
          )}
        </>
      ) : (
        <></>
      )}

      <Box sx={{ flexGrow: 1, mx: 5 }}>
        <Grid container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }}>
          {auction?.map((auction_item) => (
            <Grid item xs={3} onClick={() => handle(auction_item)}>
              <Card
                id={auction_item.car_info.id}
                car_models={auction_item.car_info.car_model}
                images={auction_item.car_info.images}
                price={auction_item.car_info.price}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Auctions;
