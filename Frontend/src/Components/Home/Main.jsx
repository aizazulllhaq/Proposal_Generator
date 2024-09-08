import React from "react";
import SearchBar from "./SearchBar";
import { Box } from "@mui/material";

const Main = () => {
  return (
    <Box flex={4} bgcolor={"black"}>
      <SearchBar />
    </Box>
  );
};

export default Main;
