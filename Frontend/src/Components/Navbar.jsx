import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Navbar = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1E201E" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>P G</Typography>
        {user ? (
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
              <Button>Login</Button>
              <Button>Signup</Button>
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
        <MenuItem bgcolor={"#111111"}>Profile</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
