import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <Box bgcolor={"red"}>
      <AppBar position="sticky" sx={{ backgroundColor: "#111111" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>P G</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>Aizaz</Typography>
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s"
              sx={{ width: 30, height: 30 }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
