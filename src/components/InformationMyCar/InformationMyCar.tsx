import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert, Box, Grid, Typography } from "@mui/material";
import { Slide } from "react-slideshow-image";
import useSelectedCar from "../../hooks/useSelectedCar";
import { useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { color } from "@mui/system";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/APIClient";
import { useMutation } from "@tanstack/react-query";
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
const AuctionButton = styled("button")({
  backgroundColor: "#ac46a4",
  color: "#FFFF",
  padding: "22px 32px",
  fontSize: "18px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#958ef8",
  },
});
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
const InformationMyCar = () => {
  const { id } = useParams();
  const { data } = useSelectedCar(id!);
  const [images, setImages] = useState<Image[]>([]);
  console.log("data123", data);
  const {
    mutate: handleSubmit,
    status,
    error,
  } = useMutation({
    mutationFn: async (values: any) => {
      await axiosInstance.post("/request_auction", {
        car_id: id,
      });
    },
  });
  useEffect(() => {
    if (data?.images) {
      const updatedImages = data.images.map((image: string) => {
        return { original: image, thumbnail: image, originalHeight: 400 };
      });
      setImages(updatedImages);
    }
  }, [data]);
  let damageList = [""];
  if (data?.damage) {
    damageList = data?.damage.split(",");
  } else {
    damageList = [];
  }

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} lg={6}>
          <ImageGallery items={images} slideInterval={3000} showIndex={true} />
        </Grid>
        <Grid container item xs={12} lg={6} spacing={1}>
          <Grid item xs={12} lg={12}>
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <AuctionButton onClick={handleSubmit}>
                add your car to auction
              </AuctionButton>
            </Box>
            {(error as string) && (
              <Alert severity="error">
                {(error as { message: string }).message as string}{" "}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} lg={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 90 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">
                      Vehicle Details
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell scope="row">mileage</StyledTableCell>
                    <StyledTableCell align="right">
                      {data?.mileage}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell scope="row">color</StyledTableCell>
                    <StyledTableCell align="right">
                      {data?.color}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell scope="row">
                      manufacturing_year
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {data?.manufacturing_year}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell scope="row">clean_title</StyledTableCell>
                    <StyledTableCell align="right">
                      {data?.clean_title ? (
                        <CheckIcon color="success" />
                      ) : (
                        <CloseIcon color="error" />
                      )}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell scope="row">engine_type</StyledTableCell>
                    <StyledTableCell align="right">
                      {data?.engine_type}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell scope="row">gear_type</StyledTableCell>
                    <StyledTableCell align="right">
                      {data?.gear_type}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell scope="row">cylinders</StyledTableCell>
                    <StyledTableCell align="right">
                      {data?.cylinders}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell scope="row">notes</StyledTableCell>
                    <StyledTableCell align="right">
                      {data?.notes}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell scope="row">price</StyledTableCell>
                    <StyledTableCell align="right">
                      {data?.price}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell scope="row">location</StyledTableCell>
                    <StyledTableCell align="right">
                      {data?.location}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell scope="row">status</StyledTableCell>
                    <StyledTableCell align="right">
                      {data?.status}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell scope="row">car_models</StyledTableCell>
                    <StyledTableCell align="right">
                      {data?.car_model}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} lg={6}>
            {data?.damage ? (
              <TableContainer style={{ marginTop: "10px" }} component={Paper}>
                <Table sx={{ minWidth: 90 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">damage</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {damageList?.map((damage) => (
                      <StyledTableRow>
                        <StyledTableCell align="center" scope="row">
                          {damage}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default InformationMyCar;
