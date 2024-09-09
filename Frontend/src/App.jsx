import { Box, Stack } from "@mui/material";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Stack>
          <Home />
        </Stack>
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

  return (
    <Box>
      <Navbar />
      <RouterProvider router={router} />
    </Box>
  );
};

export default App;
