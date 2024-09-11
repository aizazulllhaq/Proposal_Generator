import { Box, Stack } from "@mui/material";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { authCheck } from "./features/Auth/authApi";
import Protected from "./features/Auth/components/Protected";

const App = () => {
  const dispatch = useDispatch();

  const { data, isLaoding } = useQuery({
    queryKey: ["authStatus"],
    queryFn: authCheck,
    retry: false,
    onSuccess: (data) => {
      if (data.isAuthenticated) {
        dispatch(setUser(data.user));
      }
    },
    onError: (err) => {
      console.log("Error while checking auth : ", err);
    },
  });

  if (isLaoding) {
    return <div>Loading....</div>;
  }

  console.log("Data : ", data);

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

  return (
    <Box>
      <Navbar />
      <RouterProvider router={router} />
    </Box>
  );
};

export default App;
