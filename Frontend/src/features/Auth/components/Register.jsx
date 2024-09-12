import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Container,
  Typography,
  InputBase,
} from "@mui/material";
import React, { useEffect } from "react";
import { AccountCircle, CloudUpload } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUserID, signupAsync } from "../authSlice";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const LoggedInUserID = useSelector(selectLoggedInUserID);
  const { signupError, signupMsg } = useSelector((state) => state.auth);

  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.profileImage[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }

    dispatch(signupAsync(formData));
    console.log("Data : ", formData);
    reset();
  };

  useEffect(() => {
    if (signupError) {
      toast.error(signupError.message);
    }

    if (signupMsg) {
      toast.success(signupMsg);
    }
  }, [signupMsg, signupError]);

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
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
              <Box mb={2}>
                <FormLabel sx={{ color: "gray", marginRight: 2 }}>
                  Profile Picture
                </FormLabel>
                <Button
                  component="label"
                  variant="outlined"
                  color="error"
                  tabIndex={-1}
                  startIcon={<CloudUpload />}
                >
                  Upload files
                  <InputBase
                    type="file"
                    onChange={(e) => setValue("profileImage", e.target.files)}
                    sx={{ display: "none" }}
                    {...register("profileImage", {
                      required: "Profile Image is required",
                    })}
                  />
                </Button>
              </Box>
              <Button color="error" variant="contained" type="submit">
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
