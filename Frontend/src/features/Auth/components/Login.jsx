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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { LoginOutlined } from "@mui/icons-material";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUserID, signinAsync } from "../authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const LoggedInUserID = useSelector(selectLoggedInUserID);
  const { signinMsg, signinError } = useSelector((state) => state.auth);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(signinAsync(data));
    reset();
  };

  if (signinError) {
    toast.error(signinError.message);
  }

  useEffect(() => {
    if (signinMsg && LoggedInUserID) {
      toast.success(signinMsg);
    }
  }, [signinMsg, LoggedInUserID, dispatch]);

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
                Login
              </Button>
            </FormControl>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
