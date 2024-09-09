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
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import apiClient from "./Utils/apiClient";
import { LoginOutlined, OpenInFull } from "@mui/icons-material";
import { Navigate } from "react-router-dom";

const login = async ({ email, password }) => {
  const response = await apiClient.post("/api/v1/users/auth/signin", {
    email,
    password,
  });
  console.log(response.data);
};

const Login = ({ user, setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { error },
    reset,
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log("Login Successfull");
      setUser(true);
    },
    onError: (error) => {
      console.log("Error while login : ", error);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // mutate(data);
  };
console.log(user);
  return (
    <>
      {user && <Navigate to="/" replace={true} />}
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
            <LockOutlinedIcon sx={{ paddingRight: "6px" }} />
            Login to your account
          </Typography>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
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
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </Box>
              <Button
                startIcon={<LoginOutlined />}
                sx={{ backgroundColor: "#0A0908", color: "gray" }}
                type="submit"
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
