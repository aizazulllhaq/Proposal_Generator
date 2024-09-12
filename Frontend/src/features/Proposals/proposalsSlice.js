import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProposals, newProposal } from "./proposalsApi";

export const newProposalAsync = createAsyncThunk(
  "proposals/newProposal",
  async (data) => {
    const response = await newProposal(data);
    return response;
  }
);

export const getUserProposalsAsync = createAsyncThunk(
  "proposals/getUserProposals",
  async () => {
    const response = await getUserProposals();
    return response;
  }
);

const initialState = {
  proposal: null,
  userProposals: null,
  error: null,
  msg: null,
  status: "idle",
};

const proposalsSlice = createSlice({
  name: "proposals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newProposalAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newProposalAsync.fulfilled, (state, action) => {
        state.proposal = action.payload;
        state.status = "idle";
        state.msg = action.payload.msg;
      })
      .addCase(newProposalAsync.rejected, (state, action) => {
        state.error = action.error;
        state.status = "idle";
      })
      .addCase(getUserProposalsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserProposalsAsync.fulfilled, (state, action) => {
        state.userProposals = action.payload;
        state.status = "idle";
      })
      .addCase(getUserProposalsAsync.rejected, (state, action) => {
        state.error = action.error;
        state.status = "idle";
      });
  },
});

export const selectNewProposal = (state) => state.proposals.proposal;
export const selectUserProposals = (state) => state.proposals.userProposals;
export default proposalsSlice.reducer;
