import { Box, Stack } from "@mui/material";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

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
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
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
