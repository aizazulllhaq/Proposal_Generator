import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HistoryIcon from "@mui/icons-material/History";
const SideBar = () => {
  return (
    <Box
      flex={2}
      bgcolor={"#111111"}
      color={"white"}
      sx={{
        display: { xs: "none", sm: "block" },
      }}
    >
      <Box
        sx={{
          position: "fixed",
          width: {
            sm: "25vw",
            md:"25vw",
            lg: "100vw", 
          },
          overflowY: "auto", 
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
          }}
          aria-label="contacts"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              opacity: 0.8,
            }}
          >
            <HistoryIcon />
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 100,
                fontSize: { sm: 28, md: 28 },
              }}
              my={2}
            >
              History
            </Typography>
          </Box>
          <ListItem>
            <KeyboardArrowRightIcon />
            <ListItemButton>
              <ListItemText
                primary="Eric Hoffman Additionally done"
                sx={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
