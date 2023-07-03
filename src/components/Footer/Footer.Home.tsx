import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

const footerBgColor = "#242424";
const footerTextColor = "#F5F5F5";
const footerLinkColor = "#F7C331";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
`;

export default function Footer(): JSX.Element {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: footerBgColor,
        color: footerTextColor,
        p: 6,
        mt: 8,
        borderTop: `1px solid ${footerTextColor}`,
        animation: `${fadeIn} 0.5s ease-in`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: footerLinkColor }}
            >
              About Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ animation: `${pulse} 1s ease-in-out infinite` }}
            >
              (Motors And More) your best way to find your car in the best time
              and best coast
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: footerLinkColor }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2">
              123 Main Street, Anytown, USA
            </Typography>
            <Typography variant="body2">
              Email:{" "}
              <Link
                href="mailto:info@example.com"
                color={footerLinkColor}
                sx={{
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                info@example.com
              </Link>
            </Typography>
            <Typography variant="body2">
              Phone:{" "}
              <Link
                href="tel:+12345678901"
                color={footerLinkColor}
                sx={{
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                +1 234 567 8901
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: footerLinkColor }}
            >
              Follow Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                "& > *": {
                  mx: 1,
                  animation: `${pulse} 1s ease-in-out infinite`,
                },
              }}
            >
              <Link href="https://www.facebook.com/" color={footerLinkColor}>
                <Facebook sx={{ fontSize: "3rem" }} />
              </Link>
              <Link href="https://www.instagram.com/" color={footerLinkColor}>
                <Instagram sx={{ fontSize: "3rem" }} />
              </Link>
              <Link href="https://www.twitter.com/" color={footerLinkColor}>
                <Twitter sx={{ fontSize: "3rem" }} />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: footerLinkColor }}
          >
            {"Designed and built by "}
            <Link color={footerLinkColor} href="https://your-website.com/">
              Your Website
            </Link>{" "}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
