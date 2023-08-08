import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { Image } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FF from "../../sound/clickbidding.mp3";
import HH from "../../sound/audio_2023-08-07_00-11-03.ogg";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import useCarAuction, { car_in_auction } from "../../hooks/useCarAuction";
import { Car } from "../../hooks/useMyCar";
import { socket } from "./../../socket";
import { number } from "yup";
import { useAudio } from "react-use";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: "#F7C331",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    // padding: 0,
    padding: 24,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Image {
  original: string;
  thumbnail: string;
  originalHeight: number;
}
function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number; currentPrice: string }
) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CircularProgress
        size={120}
        variant="determinate"
        {...props}
        value={Math.round((props.value * 100) / 30)}
      />
      <Button
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
        }}
      >
        <Box>
          <Typography variant="caption" component="div" color="text.secondary">
            {props.currentPrice} M
            <br />
            {`${Math.round(props.value)}`}
          </Typography>
        </Box>
      </Button>
    </Box>
  );
}

// function hii() {
//   socket.emit("hello", { abbode: 1 });
//   console.log("h000000000000000000000000000000000000");
// }
interface ListItem {
  id: number;
  name: string;
  age: number;
}
const AuctionLive = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [IsStartAuction, setIsStartAuction] = useState(false);
  const { id } = useParams();
  const { data: cars } = useCarAuction(id!);
  const [mainCar, setMainCar] = useState<Car>();
  const [listNextCar, setListNextCar] = useState<car_in_auction[]>([]);
  const [owner, setOwner] = useState(0);
  const [auctionId, setAuctionId] = useState(0);
  const [currentPrice, setCurrentPrice] = useState("");
  const [progress, setProgress] = React.useState(1);
  const prices = ["0.5", "1", "2", "5", "7", "10"];
  const [images, setImages] = useState<Image[]>([]);
  const [audio1, state1, controls1] = useAudio({
    src: FF,
    autoPlay: false,
  });
  const [audio2, state2, controls2] = useAudio({
    src: HH,
    autoPlay: false,
  });
  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value as string);
  };
  const handleBidding = () => {
    if (selectedValue === "") {
    } else {
      socket.emit("outbid", {
        auction_id: auctionId,
        car_bids_on_it: mainCar?.id,
        owner_car_id: owner,
        amount: selectedValue,
      });
    }
  };
  const processAuction = (data: any) => {
    setIsStartAuction(data.watcher);
    setProgress(data.counter);
    setOwner(data.owner_car_id);
    setAuctionId(data.auction_id);
    setCurrentPrice(data.price);
    controls2.play();
    cars?.map((car) => {
      if (car.car_info.id < data.car_bids_on_it) {
      } else if (car.car_info.id === data.car_bids_on_it) {
        setMainCar(car.car_info);
        const updatedImages = car.car_info.images.map((image: string) => {
          return { original: image, thumbnail: image, originalHeight: 400 };
        });
        setImages(updatedImages);
        if (data.car_bids_on_it === cars[cars.length - 1].car_id) {
          setListNextCar([]);
        }
      } else {
        const listCar = cars.filter((c) => c.car_info.id > data.car_bids_on_it);
        setListNextCar(listCar);
      }
    });
  };
  useEffect(() => {
    socket.on("start_auction", (data) => {
      data["watcher"] = true;
      processAuction(data);
    });
    socket.on("watcher", (data) => {
      data["watcher"] = false;
      processAuction(data);
    });
    socket.on("bidding", (data) => {
      controls2.pause();
      controls1.play();
    });
    return () => {};
  }, [cars, listNextCar]);
  return (
    <>
      <form>
        <Grid container spacing={5}>
          <Grid item xs={12} lg={4}>
            <ImageGallery
              items={images}
              slideInterval={3000}
              showIndex={true}
            />
          </Grid>
          <Grid container item xs={12} lg={4}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 80 }}
                size="small"
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center">
                      Vehicle Details
                    </StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell scope="row">mileage</StyledTableCell>
                    <StyledTableCell align="right">
                      {mainCar?.mileage}
                    </StyledTableCell>
                    <StyledTableCell scope="row">color</StyledTableCell>
                    <StyledTableCell align="left">
                      {mainCar?.color}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell scope="row">
                      manufacturing year
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {mainCar?.manufacturing_year}
                    </StyledTableCell>
                    <StyledTableCell scope="row">clean title</StyledTableCell>
                    <StyledTableCell align="left">
                      {mainCar?.clean_title ? (
                        <CheckIcon color="success" />
                      ) : (
                        <CloseIcon color="error" />
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell scope="row">engine type</StyledTableCell>
                    <StyledTableCell align="right">
                      {mainCar?.engine_type}
                    </StyledTableCell>
                    <StyledTableCell scope="row">gear type</StyledTableCell>
                    <StyledTableCell align="left">
                      {mainCar?.engine_type}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell scope="row">cylinders</StyledTableCell>
                    <StyledTableCell align="right">
                      {mainCar?.cylinders}
                    </StyledTableCell>
                    <StyledTableCell scope="row">car models</StyledTableCell>
                    <StyledTableCell align="left">
                      {mainCar?.car_model}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell scope="row">price</StyledTableCell>
                    <StyledTableCell align="right">
                      {mainCar?.price}
                    </StyledTableCell>
                    <StyledTableCell scope="row">location</StyledTableCell>
                    <StyledTableCell align="left">
                      {mainCar?.location}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell scope="row">notes</StyledTableCell>
                    <StyledTableCell align="center">
                      {mainCar?.notes}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid container item xs={12} lg={4}>
            <Grid item xs={12} lg={4}>
              <CircularProgressWithLabel
                value={progress}
                currentPrice={currentPrice}
              />
              <Button
                className="bidding"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 5, mb: 2, mr: 2, height: "50px" }}
                disabled={!IsStartAuction}
                onClick={handleBidding}
              >
                bidding
              </Button>
              <Box component="form" sx={{ mt: 5 }}>
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <InputLabel id="current_price_label" sx={{ fontSize: 12 }}>
                    price bidding car
                  </InputLabel>
                  <Select
                    labelId="current_price"
                    id="current_price"
                    name="current_price"
                    label="current_price"
                    value={selectedValue}
                    onChange={handleSelectChange}
                    disabled={!IsStartAuction}
                  >
                    {prices.map((price) => (
                      <MenuItem
                        key={price}
                        value={price}
                        onClick={() => {
                          const nameInput = document.querySelector(
                            'input[name="bidding"]'
                          ) as HTMLInputElement;
                          if (nameInput) {
                            nameInput.focus();
                          }
                        }}
                      >
                        {price} M SP
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {audio2}
              {audio1}
            </Grid>
            <Grid item xs={12} lg={6}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {listNextCar.map((car) => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar sx={{ mr: 2, width: 100, height: 80 }}>
                        <ImageListItem>
                          <img
                            alt="Travis Howard"
                            src={car.car_info.images[0]}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 0,
                            }}
                          />
                          <ImageListItemBar sx={{ height: 20 }} title="next" />
                        </ImageListItem>
                      </ListItemAvatar>
                      <ListItemText
                        primary={car.car_info.car_model}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              lot:{car.car_id}
                            </Typography>
                            <Typography>
                              odoMeter: {car.car_info.mileage}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AuctionLive;
