import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress
        sx={{ mx: "auto" }}
        style={{ width: "20px", height: "20px" }}
      />
    </Box>
  );
};

export default Spinner;
