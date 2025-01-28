
import { Typography, Box } from "@mui/material";

const UserProfile = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>
      <Typography>View and edit your profile details here.</Typography>
    </Box>
  );
};

export default UserProfile;
