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
        height: "100vh",
        overflowY: "scroll",
        scrollbarWidth: "none",
        display: { xs: "none", sm: "block" },
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
            sx={{ textAlign: "center", fontWeight: 100, fontSize: 28 }}
            my={2}
          >
            History
          </Typography>
        </Box>
        <ListItem>
          <KeyboardArrowRightIcon />
          <ListItemButton>
            <ListItemText primary="Eric Hoffman Additionally done" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <KeyboardArrowRightIcon />

          <ListItemButton>
            <ListItemText primary="Eric Hoffman Additionally done" />
          </ListItemButton>
        </ListItem>{" "}
        <ListItem>
          <KeyboardArrowRightIcon />

          <ListItemButton>
            <ListItemText primary="Eric Hoffman Additionally done" />
          </ListItemButton>
        </ListItem>{" "}
        <ListItem>
          <KeyboardArrowRightIcon />

          <ListItemButton>
            <ListItemText primary="Eric Hoffman Additionally done" />
          </ListItemButton>
        </ListItem>{" "}
        <ListItem>
          <KeyboardArrowRightIcon />

          <ListItemButton>
            <ListItemText primary="Eric Hoffman Additionally done" />
          </ListItemButton>
        </ListItem>{" "}
        <ListItem>
          <KeyboardArrowRightIcon />

          <ListItemButton>
            <ListItemText primary="Eric Hoffman Additionally done" />
          </ListItemButton>
        </ListItem>{" "}
        <ListItem>
          <KeyboardArrowRightIcon />

          <ListItemButton>
            <ListItemText primary="Eric Hoffman Additionally done" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <KeyboardArrowRightIcon />

          <ListItemButton>
            <ListItemText primary="Eric Hoffman Additionally done" />
          </ListItemButton>
        </ListItem>{" "}
        <ListItem>
          <KeyboardArrowRightIcon />

          <ListItemButton>
            <ListItemText primary="Eric Hoffman Additionally done" />
          </ListItemButton>
        </ListItem>{" "}
        <ListItem>
          <KeyboardArrowRightIcon />

          <ListItemButton>
            <ListItemText primary="Eric Hoffman Additionally done" />
          </ListItemButton>
        </ListItem>{" "}
        <ListItem>
          <KeyboardArrowRightIcon />

          <ListItemButton>
            <ListItemText primary="Eric Hoffman Additionally done" />
          </ListItemButton>
        </ListItem>{" "}
      </List>
    </Box>
  );
};

export default SideBar;
