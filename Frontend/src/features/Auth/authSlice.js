import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authCheck, logout, signin, signup } from "./authApi";

export const signinAsync = createAsyncThunk("auth/signin", async (data) => {
  const response = await signin(data);
  return response;
});

export const signupAsync = createAsyncThunk("auth/signup", async (data) => {
  const response = await signup(data);
  return response;
});

export const authCheckAsync = createAsyncThunk("auth/authCheck", async () => {
  const response = await authCheck();
  return response.data.id;
});

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  const response = await logout();
  return response;
});

const authSlice = createSlice({
  name: "login",
  initialState: {
    LoggedInUserID: null,
    checkAuth: false,
    status: "idle",
    signupError: null,
    signupMsg: null,
    signinError: null,
    signinMsg: null,
    logoutMsg: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authCheckAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authCheckAsync.fulfilled, (state, action) => {
        state.LoggedInUserID = action.payload;
        state.isLoading = false;
        state.checkAuth = true;
      })
      .addCase(authCheckAsync.rejected, (state, action) => {
        state.checkAuth = true;
        state.status = "idle";
      })
      .addCase(signinAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signinAsync.fulfilled, (state, action) => {
        state.LoggedInUserID = action.payload.id;
        state.signinMsg = action.payload.msg;
        state.status = "idle";
        state.checkAuth = true;
      })
      .addCase(signinAsync.rejected, (state, action) => {
        state.signinError = action.error;
        state.status = "idle";
      })
      .addCase(signupAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        console.log("ap : ", action.payload);
        state.LoggedInUserID = action.payload.id;
        state.status = "idle";
        state.checkAuth = true;
        state.signupMsg = action.payload.msg;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.signupError = action.error;
        state.status = "loading";
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.LoggedInUserID = null;
        state.logoutMsg = action.payload;
      });
  },
});

export const selectCheckAuth = (state) => state.auth.checkAuth;
export const selectLoggedInUserID = (state) => state.auth.LoggedInUserID;
export const { setUser, clearUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
