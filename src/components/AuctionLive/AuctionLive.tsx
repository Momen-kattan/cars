import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Slide } from "react-slideshow-image";
import useSelectedCar from "../../hooks/useSelectedCar";
import { useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
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

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CircularProgress size={200} variant="determinate" {...props} />
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
        }}
      >
        <Box>
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Button>
    </Box>
  );
}

const AuctionLive = () => {
  const { id } = useParams();
  const { data } = useSelectedCar(id!);
  const [progress, setProgress] = React.useState(1);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 1
      );
    }, 1200);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} lg={6}>
          <Slide>
            {slideImages.map((slideImage, index) => (
              <div key={index}>
                <Box
                  style={{
                    backgroundSize: "cover",
                    height: "400px",
                    backgroundImage: `url(${slideImage.url})`,
                  }}
                ></Box>
              </div>
            ))}
          </Slide>
        </Grid>
        <Grid container item xs={12} lg={6} spacing={1}>
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
            <CircularProgressWithLabel value={progress} />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 90 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">
                      Bid Information
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell scope="row">model</StyledTableCell>
                    <StyledTableCell align="right">535</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell scope="row">model</StyledTableCell>
                    <StyledTableCell align="right">535</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell scope="row">model</StyledTableCell>
                    <StyledTableCell align="right">535</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell scope="row">model</StyledTableCell>
                    <StyledTableCell align="right">535</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AuctionLive;
