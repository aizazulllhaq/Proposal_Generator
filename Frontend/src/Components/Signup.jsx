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
import { AccountCircle } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import apiClient from "./Utils/apiClient";
import { useMutation } from "@tanstack/react-query";

const signUp = async ({ name, email, password }) => {
  const response = await apiClient.post("/api/v1/users/auth/signup", {
    name,
    email,
    password,
  });
  console.log(response);
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { error },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      console.log("Registration Successfull");
    },
    onError: (error) => {
      console.log("Register Error : ", error.response.data.message);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // mutate(data);
    reset();
  };

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
        <Typography
          textAlign={"center"}
          m={4}
          fontSize={20}
          fontWeight={70}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <AccountCircle sx={{ paddingRight: "6px" }} />
          Create your account
        </Typography>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <Box mb={2}>
              <FormLabel sx={{ color: "gray" }}>Enter Name</FormLabel>
              <TextField
                fullWidth
                variant="outlined"
                InputProps={{ style: { color: "gray" } }}
                {...register("name", { required: "Name is required" })}
              />
            </Box>
            <Box mb={2}>
              <FormLabel sx={{ color: "gray" }}>Enter Email</FormLabel>
              <TextField
                fullWidth
                variant="outlined"
                InputProps={{ style: { color: "white" } }}
                {...register("email", { required: "Email is required" })}
              />
            </Box>
            <Box mb={2}>
              <FormLabel sx={{ color: "gray" }}>Enter Password</FormLabel>
              <TextField
                fullWidth
                variant="outlined"
                InputProps={{ style: { color: "gray" } }}
                {...register("password", { required: "Password is required" })}
              />
            </Box>
            <Button
              sx={{ backgroundColor: "#0A0908", color: "gray" }}
              type="submit"
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </Container>
    </Box>
  );
};

export default Signup;
