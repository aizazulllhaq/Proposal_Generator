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
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../authSlice";
import { signup } from "../authApi";

const Register = () => {
  const dispatch = useDispatch();

  const {
    mutate,
    isLoading,
    error: signupError,
  } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("Registration Successfull");
      dispatch(setUser(data.user));
    },
    onError: (err) => {
      console.log("Register Error : ", err);
      dispatch(setError(err.message));
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { error },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(setLoading(true));
    console.log(data);
    mutate(data);
    dispatch(setLoading(false));
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
              {isLoading ? "Loading..." : "Signup"}
            </Button>
            {signupError && (
              <Typography color="error">{signupError.message}</Typography>
            )}
          </FormControl>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
