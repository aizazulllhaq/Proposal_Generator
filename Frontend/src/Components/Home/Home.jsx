import React from "react";
import SideBar from "./SideBar";
import Main from "./Main";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{display:"flex"}}>
      <SideBar />
      <Main />
    </Box>
  );
};

export default Home;
