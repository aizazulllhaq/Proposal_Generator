import React, { useState } from "react";
import { Box } from "@mui/material";
import SideBar from "./SideBar";
import Main from "./Main";

const Home = () => {
  const [proposal, setProposal] = useState(null);

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar setProposal={setProposal} />
      <Main proposal={proposal} />
    </Box>
  );
};

export default Home;
