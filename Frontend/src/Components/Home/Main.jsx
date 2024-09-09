import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, styled, Typography } from "@mui/material";
import axios from "axios";

const Search = styled("div")({
  width: "90%",
  maxWidth: 600,
  padding: "10px",
  display: "flex",
  flexDirection: "column",
});

const StyledTextarea = styled("textarea")({
  width: "100%",
  height: "120px",
  backgroundColor: "#2c2c2c",
  border: "none",
  borderRadius: "15px",
  outline: "none",
  color: "white",
  padding: "10px",
  fontSize: "16px",
  fontFamily: "inherit",
  resize: "none",
  overflowY: "auto",
  scrollbarWidth: "none",
  boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.5)",
});

const Main = () => {
  const [response, setResponse] = useState("");
  const getProposals = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getProposals");
      console.log(response.data.data[0].content);
      setResponse(response.data.data[0].content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProposals();
  }, []);

  return (
    <Box
      flex={{ xs: 4, sm: 6 }}
      bgcolor={"#0A0908"}
      color={"white"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      px={2}
    >
      <Typography
        fontWeight={100}
        fontSize={{ xs: 20, sm: 25 }}
        textAlign={"center"}
        fontFamily={"monospace"}
        my={2}
      >
        AI-Powered Proposal Generator for Your Business Needs
      </Typography>
      <Search>
        <StyledTextarea
          minRows={5}
          placeholder="Enter project description in detail to generate proposal"
        />
        <IconButton>
          <Button variant="contained" color="error">
            Generate Proposal
          </Button>
        </IconButton>
      </Search>
      <Search>
        <Typography sx={{ opacity: 0.9, fontWeight: 50, fontSize: 18 }}>
          {response && <p>{response}</p>}
        </Typography>
      </Search>
    </Box>
  );
};

export default Main;
