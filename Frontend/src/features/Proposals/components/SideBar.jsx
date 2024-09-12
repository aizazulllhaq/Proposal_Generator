import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HistoryIcon from "@mui/icons-material/History";
import { useDispatch, useSelector } from "react-redux";
import { getUserProposalsAsync } from "../proposalsSlice";

const SideBar = ({ setProposal }) => {
  const dispatch = useDispatch();
  const proposals = useSelector((state) => state.proposals.userProposals);

  useEffect(() => {
    dispatch(getUserProposalsAsync());
  }, [dispatch]);
  return (
    <Box
      flex={2}
      bgcolor={"#191919"}
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
            md: "25vw",
            lg: "100vw",
          },
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: { sm: 5, md: 10 },
            gap: 1,
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
        <Typography variant="span" color="gray" sx={{ marginLeft: 6 }}>
          Last 7 Submitted Proposals
        </Typography>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            display: "flex",
            flexDirection: "column",
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
          ></Box>
          {proposals &&
            proposals.map((proposal, index) => (
              <ListItem key={index}>
                <KeyboardArrowRightIcon />
                <ListItemButton onClick={() => setProposal(proposal)}>
                  <ListItemText
                    primary={proposal.name}
                    sx={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
