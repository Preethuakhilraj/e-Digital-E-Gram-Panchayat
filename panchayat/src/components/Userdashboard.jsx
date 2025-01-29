import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
} from "@mui/material";
import { Logout, Person, Work, Assignment, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosinterceptor";

const drawerWidth = 240;

const UserDashboard = () => {
  const fileInputRef = useRef(null);  // Create a reference for the file input
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);

  const [selectedSection, setSelectedSection] = useState("Services List");
   const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [userProfile, setUserProfile] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "",
  });
  const [documents, setDocuments] = useState([]); // Initialize as an empty array
  const [services, setServices] = useState([]);
  const [userApplications, setUserApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosInstance.get("/services");
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUserProfile(storedUser);
        console.log(storedUser)
        fetchApplications(storedUser.id);
      }
    };
    fetchUserProfile();
  }, []);

  const fetchApplications = async (userId) => {
    try {
      const res = await axiosInstance.get(`/applications/${userId}`);
      setUserApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleNavigation = (section) => {
    setSelectedSection(section);
    if (section === "Application Status") fetchApplications(userProfile.id);
  };

  const handleApplyForService = async (id) => {
    try {
      // Fetch service details before opening the dialog
      const serviceResponse = await axiosInstance.get(`/services/${id}`);
      console.log(serviceResponse)
      const selectedService = serviceResponse.data;
  
      // Check if user has already applied for this service
      const hasApplied = userApplications.some(app => app.service._id === id);
      if (hasApplied) {
        alert("You have already applied for this service.");
        return;
      }
  
      // Show a confirmation dialog before proceeding
      const userConfirmed = window.confirm(`Are you sure you want to apply for ${selectedService.name}?`);
      if (!userConfirmed) return;
  
      setServiceId(id);
      setOpenApplyDialog(true);
    } catch (error) {
      console.error("Error fetching service details:", error);
      alert("Failed to fetch service details. Please try again.");
    }
  };

  const handleEditProfile = () => {
    setOpenProfileDialog(true);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      setDocuments([...files]); // Convert FileList to an array and set the state
    }
  };
  const handleSubmitApplication = async () => {
    const formData = new FormData();
    
    const fileInput = fileInputRef.current; // Access the file input via ref
    const serviceId = "someServiceId"; // Example service ID
    const userId = "someUserId"; // Example user ID
    
    // Ensure that the file input exists and contains a selected file
    if (fileInput && fileInput.files.length > 0) {
      formData.append("documents", fileInput.files[0]);
    } else {
      console.error("No file selected");
      return;
    }

    // Append the required fields
    formData.append("service", serviceId);
    formData.append("user", userId);

    try {
      setIsSubmitting(true);
      const response = await axios.post('/applications/apply', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log('Application submitted:', response.data);
      setOpenApplyDialog(false);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, backgroundColor: "#001f3f", color: "white" },
        }}
      >
        <Toolbar />
        <List>
          {["Services List", "My Profile", "Application Status"].map((text, index) => (
            <ListItem button key={index} onClick={() => handleNavigation(text)}>
              <ListItemIcon sx={{ color: "white" }}>
                {index === 0 ? <Work /> : index === 1 ? <Person /> : <Assignment />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "#f8f9fa", color: "#333", boxShadow: "none", borderBottom: "1px solid #ddd" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Welcome, {userProfile.name}</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={userProfile.avatar || "/assets/user-avatar.png"} sx={{ marginRight: "10px" }} />
              <IconButton color="inherit" onClick={handleEditProfile}>
                <Edit />
              </IconButton>
              <IconButton color="inherit" onClick={handleLogout}>
                <Logout />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {selectedSection === "Services List" && (
          <Box>
            {services.map((service) => (
              <Paper
                key={service._id}
                sx={{ padding: 2, marginBottom: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <Typography>{service.name}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleApplyForService(service._id)}>
                  Apply
                </Button>
              </Paper>
            ))}
          </Box>
        )}

        {selectedSection === "My Profile" && (
          <Box sx={{ padding: 3 }}>
            <Typography variant="h5">Profile Details</Typography>
            <Paper sx={{ padding: 3, maxWidth: 400 }}>
              <Avatar src={userProfile.avatar || "/assets/user-avatar.png"} sx={{ width: 80, height: 80, marginBottom: 2 }} />
              <TextField fullWidth label="Name" value={userProfile.name} margin="dense" />
              <TextField fullWidth label="Email" value={userProfile.email} margin="dense" disabled />
            </Paper>
          </Box>
        )}

        {selectedSection === "Application Status" && (
          <Box>
            {userApplications.length > 0 ? (
              userApplications.map((app) => (
                <Box
                  key={app._id}
                  sx={{
                    padding: 2,
                    border: "1px solid #ddd",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography variant="h6">{app.service.name}</Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong> {app.status}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date Applied:</strong> {new Date(app.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>No applications found.</Typography>
            )}
          </Box>
        )}
      </Box>

      {/* Apply Service Dialog */}
      <Dialog open={openApplyDialog} onClose={() => setOpenApplyDialog(false)}>
        <DialogTitle>Apply for Service</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Upload required documents:</Typography>
          <TextField
            type="file"
            onChange={handleFileChange} // Updated to use the new handler
            fullWidth
            margin="dense"
            inputProps={{ multiple: true }} // Allows multiple file selection
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApplyDialog(false)} color="secondary">
            Cancel
          </Button>
          <input type="file" ref={fileInputRef} />
      <button onClick={handleSubmitApplication} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
          <Button onClick={handleSubmitApplication} color="primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Edit Dialog */}
      <Dialog open={openProfileDialog} onClose={() => setOpenProfileDialog(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Edit your profile details:</Typography>
          {/* Add your profile edit form here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProfileDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDashboard;
