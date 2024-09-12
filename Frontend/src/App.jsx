import { Box, Stack } from "@mui/material";
import Navbar from "./Components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { useDispatch, useSelector } from "react-redux";
import Protected from "./features/Auth/components/Protected";
import { useEffect } from "react";
import {
  authCheckAsync,
  selectCheckAuth,
} from "./features/Auth/authSlice";
import Home from "./features/Proposals/components/Home";

const App = () => {
  const dispatch = useDispatch();
  const checkAuth = useSelector(selectCheckAuth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Stack>
            <Home />
          </Stack>
        </Protected>
      ),
    },
    {
      path: "/signin",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ]);

  useEffect(() => {
    dispatch(authCheckAsync());
  }, []);

  return (
    <>
      {checkAuth && (
        <Box>
          <Navbar />
          <RouterProvider router={router} />
        </Box>
      )}
    </>
  );
};

export default App;
