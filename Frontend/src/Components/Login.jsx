import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0A0908",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "#111111",
          color: "white",
          p: 3,
          borderRadius: 2,
          m: { xs: 2, sm: "auto" },
        }}
      >
        <Typography textAlign={"center"} m={4} fontSize={20} fontWeight={70} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <LockOutlinedIcon  sx={{paddingRight:"6px"}}/>
          Login to your account
        </Typography>
        <FormControl fullWidth>
          <Box mb={2}>
            <FormLabel sx={{ color: "gray" }}>Enter Name</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              InputProps={{ style: { color: "gray" } }}
            />
          </Box>
          <Box mb={2}>
            <FormLabel sx={{ color: "gray" }}>Enter Email</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              InputProps={{ style: { color: "white" } }}
            />
          </Box>
          <Box mb={2}>
            <FormLabel sx={{ color: "gray" }}>Enter Password</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              InputProps={{ style: { color: "gray" } }}
            />
          </Box>
          <Button sx={{ backgroundColor: "#0A0908", color: "gray" }}>
            Submit
          </Button>
        </FormControl>
      </Container>
    </Box>
  );
};

export default Login;
