import React from "react";
import SideBar from "./SideBar";
import Main from "./Main";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box sx={{display:"flex"}}>
      <SideBar />
      <Main />
    </Box>
  );
};

export default Home;
