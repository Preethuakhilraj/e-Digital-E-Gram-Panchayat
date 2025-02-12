import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Avatar,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Edit, Save, Cancel, CloudUpload } from "@mui/icons-material";
import PropTypes from "prop-types";
import axiosInstance from "./axiosinterceptor";

const UserProfile = ({ userProfile, onUpdateProfile = () => {}, isLoading, error }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);
  const [avatar, setAvatar] = useState("/assets/user-avatar.png");

  // Sync formData with updated userProfile props
  useEffect(() => {
    setFormData(userProfile);
  }, [userProfile]);

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
      alert(" Profile successfully updated");
    } catch (error) {
      console.error("Profile Update Error:", error);
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
        minHeight: "80vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        gap: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundImage: 'url("https://img.freepik.com/free-vector/registration-form-template-with-flat-design_23-2147971971.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
          minHeight: "80vh",
        }}
      />

      <Box sx={{ flex: 1 }}>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Paper
            sx={{
              padding: 2,
              boxShadow: 2,
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
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
                { label: "Work", key: "work" },
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
    </Box>
  );
};

UserProfile.propTypes = {
  userProfile: PropTypes.object.isRequired,
  onUpdateProfile: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default UserProfile;