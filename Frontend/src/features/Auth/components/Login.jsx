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
import { LoginOutlined } from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../authApi";
import { setError, setLoading, setUser } from "../authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const {
    mutate,
    data,
    error: loginError,
    isLoading,
  } = useMutation({
    mutationFn: signin,
    onSuccess: () => {
      console.log("Login Successfull");
      dispatch(setUser(data.user));
    },
    onError: (err) => {
      console.log("Error while login : ", err);
      dispatch(setError(err.message));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { error },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(setLoading(true));
    mutate(data);
    dispatch(setLoading(false));
    reset();
  };

  return (
    <>
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
                {isLoading ? "Loading..." : "Login"}
              </Button>
              {loginError && (
                <Typography color="error">{loginError.message}</Typography>
              )}
            </FormControl>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
