import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync, selectLoggedInUserID } from "../features/Auth/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const LoggedInUserID = useSelector(selectLoggedInUserID);
  const { logoutMsg } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  console.log("LoggedInUserID ", LoggedInUserID);

  const handleLogout = () => {
    dispatch(logoutAsync());
    setOpen(false);
  };

  if (logoutMsg) {
    toast.success(logoutMsg);
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1E201E" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>P G</Typography>
        {LoggedInUserID ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>Aizaz</Typography>
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s"
              sx={{ width: 30, height: 30 }}
              onClick={(e) => setOpen(true)}
            />
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ButtonGroup color="error">
              <Button component={Link} href="/signin">
                Login
              </Button>
              <Button component={Link} href="/signup">
                Signup
              </Button>
            </ButtonGroup>
          </Box>
        )}
      </Toolbar>
      <Menu
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          mt: 5,
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
