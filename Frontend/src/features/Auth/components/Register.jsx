import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { AccountCircle } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUserID, signupAsync } from "../authSlice";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const LoggedInUserID = useSelector(selectLoggedInUserID);
  const { signupError, signupMsg } = useSelector((state) => state.auth);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(signupAsync(data));
    reset();
  };

  if (signupError) {
    toast.error(signupError.message);
  }

  if (signupMsg) {
    toast.success(signupMsg);
  }

  return (
    <>
      {LoggedInUserID && <Navigate to="/" replace={true} />}
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
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </Box>
              <Button
                sx={{ backgroundColor: "#0A0908", color: "gray" }}
                type="submit"
              >
                Signup
              </Button>
            </FormControl>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
