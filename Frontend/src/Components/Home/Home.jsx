import React, { useState } from "react";
import SideBar from "./SideBar";
import Main from "./Main";
import { Box } from "@mui/material";

const Home = () => {
  const [selectedProposal, setSelectedProposal] = useState(null);

  const handleProposal = (proposal) => {
    console.log("single : ", proposal);
    setSelectedProposal(proposal);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar onProposalClick={handleProposal} />
      <Main selectedProposal={selectedProposal} />
    </Box>
  );
};

export default Home;
