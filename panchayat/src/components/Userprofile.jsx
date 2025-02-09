import { useState } from "react";
import { Box, Paper, TextField, Avatar, Typography, Button, IconButton, CircularProgress, Grid } from "@mui/material";
import { Edit, Save, Cancel, CloudUpload } from "@mui/icons-material";
import PropTypes from "prop-types";
import axiosInstance from "./axiosinterceptor";

const UserProfile = ({ userProfile, onUpdateProfile, isLoading, error }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);
  const [avatar, setAvatar] = useState("/assets/user-avatar.png");

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    
      try {
        const response = await axiosInstance.put(`/auth/update-profile/${formData._id}`, formData);
        onUpdateProfile(response.data);
        setIsEditing(false);
      } catch (error) {
        console.error(error);
        alert("Error updating profile!");
      }
 
      };
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
    sx={{
      minHeight: "100vh",
      backgroundImage: 'url("https://img.freepik.com/free-vector/green-low-poly-background_1057-1542.jpg?t=st=1739093287~exp=1739096887~hmac=4b286346033f949c101484f2a924f0b36072134cc2c1187e67e32f07af26ee54&w=740")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 3,
    }}
  >      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Paper sx={{ padding: 3, maxWidth: 400, boxShadow: 3, borderRadius: 2,backgroundImage:'https://img.freepik.com/free-vector/minimalist-background-gradient-design-style_483537-3002.jpg?ga=GA1.1.1540396942.1739092747&semt=ais_hybrid' }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <Avatar src={avatar} sx={{ width: 80, height: 80 }} />
            {isEditing && (
              <IconButton component="label">
                <CloudUpload />
                <input type="file" hidden onChange={handleAvatarChange} />
              </IconButton>
            )}
          </Box>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {[
              { label: "Name", key: "name" },
              { label: "Email", key: "email" },
              { label: "Phone", key: "phone" },
              { label: "Date of Birth", key: "dob" },
              { label: "Address", key: "address" },
              { label: "Role", key: "role" },
              { label: "Work", key: "work" }
            ].map(({ label, key }) => (
              <Grid item xs={12} key={key}>
                <TextField
                  fullWidth
                  label={label}
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Save />}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Cancel />}
                  onClick={handleEditToggle}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={handleEditToggle}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

UserProfile.propTypes = {
  userProfile: PropTypes.object.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default UserProfile;
