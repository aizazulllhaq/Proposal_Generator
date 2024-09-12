import TipsAndUpdates from "@mui/icons-material/TipsAndUpdates";
import { Button, InputBase, styled, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getUserProposalsAsync, newProposalAsync } from "../proposalsSlice";

const SearchBarSection = styled("div")({
  width: "90%",
  maxWidth: 600,
  padding: "10px",
});

const StyledTextarea = styled("textarea")({
  width: "100%",
  height: "120px",
  backgroundColor: "#1E201E",
  border: "none",
  borderRadius: "8px",
  outline: "none",
  color: "white",
  padding: "20px 10px",
  fontSize: "16px",
  fontFamily: "inherit",
  resize: "none",
  overflowY: "auto",
  scrollbarWidth: "none",
  boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.5)",
});

const StyledInput = styled(InputBase)({
  width: "103%",
  height: "60px",
  backgroundColor: "#1E201E",
  border: "none",
  borderRadius: "8px",
  outline: "none",
  color: "white",
  padding: "10px",
  fontSize: "16px",
  fontWeight: 100,
  fontFamily: "inherit",
  boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.5)",
  marginBottom: "4px",
  "& .MuiInputBase-input": {
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    boxShadow: "none",
    height: "100%", // Ensures full height usage
    width: "100%",
    overflow: "hidden", // Remove default scrollbars
    fontSize: "16px", // Custom font size
  },
});

const SearchBar = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await dispatch(newProposalAsync(data));
    dispatch(getUserProposalsAsync());
    reset();
  };

  return (
    <>
      <Typography
        fontWeight={100}
        fontSize={{ xs: 20, sm: 25 }}
        textAlign={"center"}
        fontFamily={"monospace"}
        my={4}
      >
        AI-Powered Proposal Generator for Your Business Needs
      </Typography>
      <SearchBarSection>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledInput
            type="text"
            {...register("name", {
              required: "Client or Company name is required",
            })}
            placeholder="Enter name/company name"
          />
          <StyledTextarea
            minRows={5}
            placeholder="Enter project description in detail to generate proposal"
            {...register("description", {
              required: "Description is required",
            })}
          />
          <Button
            variant="contained"
            color="error"
            type="submit"
            endIcon={<TipsAndUpdates />}
            sx={{ margin: "10px 0px" }}
          >
            Generate Proposal
          </Button>
        </form>
      </SearchBarSection>
    </>
  );
};

export default SearchBar;
