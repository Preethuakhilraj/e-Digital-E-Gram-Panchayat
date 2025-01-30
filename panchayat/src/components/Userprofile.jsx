import { Box, Paper, TextField, Avatar, Typography } from "@mui/material";
import PropTypes from 'prop-types';
const UserProfile = ({ userProfile }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5">Profile Details</Typography>
      <Paper sx={{ padding: 3, maxWidth: 400 }}>
        <Avatar src={ "/assets/user-avatar.png"} sx={{ width: 80, height: 80, marginBottom: 2 }} />
        <TextField fullWidth label="Name" value={userProfile.name} margin="dense" disabled />
        <TextField fullWidth label="Email" value={userProfile.email} margin="dense" disabled />
      </Paper>
    </Box>
  );
};
UserProfile.propTypes = {
  userProfile: PropTypes.func.isRequired, // Ensure it's a function and is required
};

export default UserProfile;
