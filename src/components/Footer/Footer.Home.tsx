import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

const footerBgColor = "#202124";
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

export default function Footer() {
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
              Motors And More is the perfect place to find your dream car at the
              best price and quality.
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
            <Typography variant="body1"></Typography>
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
                MotorsAndMore@gmail.com
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
                +963 234 567 8901
              </Link>
            </Typography>
            <Typography variant="body2">
              Fax:{" "}
              <Link
                href="fax:123-456-7890"
                color={footerLinkColor}
                sx={{
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                123-456-7890
              </Link>
            </Typography>
            <Box sx={{ mt: 2 }}></Box>
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
              <Link href="https://www.youtube.com/" color={footerLinkColor}>
                <YouTube sx={{ fontSize: "3rem" }} />
              </Link>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                Follow us on our social media profiles for updates and
                promotions.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} Motors And More. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
