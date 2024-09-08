import React from "react";
import { Box, Button, IconButton, styled, Typography } from "@mui/material";

const Search = styled("div")({
  width: "90%",
  maxWidth: 600,
  padding: "10px",
  boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.5)",
  display:"flex",
  flexDirection:"column",
});

const StyledTextarea = styled("textarea")({
  width: "100%",
  height: "100px",
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
});

const Main = () => {
  return (
    <Box
      flex={6}
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
    </Box>
  );
};

export default Main;
