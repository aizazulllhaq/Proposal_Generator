import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/features/Auth/authSlice";
import proposalsReducer from "../src/features/Proposals/proposalsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    proposals:proposalsReducer
  },
});

export default store;
