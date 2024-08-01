import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { StyledSomethingWentWrongPage } from "./style";
import { Button, Container, Typography } from "@mui/material";

const SomethingWentWrongPage = () => {
  return (
    <StyledSomethingWentWrongPage>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Oops! Something Went Wrong
        </Typography>
        <Typography variant="body1" gutterBottom>
          We apologize for the inconvenience. Please try again later.
        </Typography>
        <Button variant="contained" component={Link} to="/">
          Back to Home
        </Button>
      </Container>
    </StyledSomethingWentWrongPage>
  );
};
export default SomethingWentWrongPage;
