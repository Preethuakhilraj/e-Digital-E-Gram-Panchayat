
import { Typography, TextField, Button, Box } from "@mui/material";

const SearchServices = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Search Services
      </Typography>
      <TextField label="Search for a service" fullWidth margin="normal" />
      <Button variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default SearchServices;
