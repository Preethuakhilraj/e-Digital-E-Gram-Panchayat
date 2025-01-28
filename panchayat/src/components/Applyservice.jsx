import { Typography, Button, Box } from "@mui/material";

const ApplyServices = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Apply Services
      </Typography>
      <Button variant="contained" color="primary">
        Apply Now
      </Button>
    </Box>
  );
};

export default ApplyServices;
