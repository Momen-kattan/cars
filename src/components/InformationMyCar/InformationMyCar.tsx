import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Grid, Typography } from "@mui/material";
import { Slide } from "react-slideshow-image";

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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Mileage", 159, 6.0, 24, 4.0),
  createData("Color", 237, 9.0, 37, 4.3),
  createData("Type", 262, 16.0, 24, 6.0),
  createData("Manufacturing year", 305, 3.7, 67, 4.3),
  createData("Clean title", 356, 16.0, 49, 3.9),
];
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
const InformationMyCar = () => {
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
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell scope="row">{row.name}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.calories}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} lg={6}>
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
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell scope="row">{row.name}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.calories}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default InformationMyCar;
