
import { Typography, Box } from "@mui/material";

const ApplicationStatus = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        My Application Status
      </Typography>
      <Typography>Check the status of your submitted applications here.</Typography>
    </Box>
  );
};

export default ApplicationStatus;
