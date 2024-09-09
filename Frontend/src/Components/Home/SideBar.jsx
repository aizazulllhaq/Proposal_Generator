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
import apiClient from "../Utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchProposals = async () => {
  const response = await apiClient.get("/getProposals");
  const proposals = response.data.data;
  console.log("Get proposals sidebar : ", proposals);
  return proposals;
};

const SideBar = ({ onProposalClick }) => {
  const { data: proposals } = useQuery({
    queryKey: ["proposals"],
    queryFn: fetchProposals,
  });

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
          {proposals &&
            proposals.map((proposal) => (
              <ListItem key={proposal.id}>
                <KeyboardArrowRightIcon />
                <ListItemButton onClick={() => onProposalClick(proposal)}>
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
