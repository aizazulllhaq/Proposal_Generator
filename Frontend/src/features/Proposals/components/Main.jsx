import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import Proposal from "./Proposal";
import { useSelector } from "react-redux";
const Main = ({ proposal }) => {
  let newProposal = useSelector((state) => state.proposals.proposal);
  const { error, status } = useSelector((state) => state.proposals);

  return (
    <Box
      flex={{ xs: 4, sm: 6 }}
      bgcolor={"#1E201E"}
      color={"white"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="90vh"
      px={2}
    >
      <SearchBar />
      {error && (
        <Typography variant="span" color="error">
          {error}
        </Typography>
      )}
      {status === "loading" && (
        <Box sx={{ width: "60%" }}>
          <LinearProgress />
        </Box>
      )}
      {newProposal || proposal ? (
        <Proposal proposal={newProposal || proposal} />
      ) : null}
    </Box>
  );
};

export default Main;
