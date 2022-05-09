import React from 'react';
import {Box, Typography} from "@mui/material";

const ErrorPage = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h1">Ooops 404 page not found</Typography>
    </Box>
  );
};

export default ErrorPage;