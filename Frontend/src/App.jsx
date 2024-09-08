import { Box, Stack } from "@mui/material";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <Box>
      <Navbar />
      <Stack>
        <Home />
      </Stack>
    </Box>
  );
};

export default App;
