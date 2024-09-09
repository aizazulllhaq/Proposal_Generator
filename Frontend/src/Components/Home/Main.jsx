import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import Proposal from "./Proposal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import apiClient from "../Utils/apiClient";

const postProposal = async ({ name, description }) => {
  const response = await apiClient.post("/generate-proposal", {
    name,
    description,
  });
  console.log("Post proposal : ", response.data);
  return response.data.data;
};

const Main = ({ selectedProposal }) => {
  const [isNewProposal, setIsNewProposal] = useState(true);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const {
    data: response,
    mutate,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: postProposal,
    onSuccess: () => {
      queryClient.invalidateQueries(["proposals"]);
    },
    onError: (error) => {
      console.log("Error posting proposal : ", error);
    },
  });

  return (
    <Box
      flex={{ xs: 4, sm: 6 }}
      bgcolor={"#1E201E"}
      color={"white"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="90vh"
      px={2}
    >
      <SearchBar
        handleSubmit={handleSubmit}
        register={register}
        reset={reset}
        mutate={mutate}
        setIsNewProposal={setIsNewProposal}
      />
      {isError && (
        <Typography variant="span" color="error">
          {error.message}
        </Typography>
      )}
      {isPending && (
        <Box sx={{ width: "60%" }}>
          <LinearProgress />
        </Box>
      )}
      {selectedProposal ? (
        <Proposal data={selectedProposal} />
      ) : (
        response && <Proposal data={response} isPending={isPending} />
      )}
    </Box>
  );
};

export default Main;
