import { useState, useEffect } from "react";
import {
  Visibility,
  AssignmentTurnedIn,
  Logout,
  DarkMode,
 } from "@mui/icons-material";
import {
  Avatar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  Modal,
  Backdrop,
  Stack,
  Grid,
} from "@mui/material";
import {
  Edit,
  Delete,
  AddBox,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosinterceptor";

const drawerWidth = 240;

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Service List");
  const [services, setServices] = useState([]);
  const [applications, setApplications] = useState([]);
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [openEditServiceDialog, setOpenEditServiceDialog] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const navigate = useNavigate();


  // Fetch Services and Applications
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services
        const { data: servicesData } = await axiosInstance.get("/services/");
        setServices(servicesData);
  
        // Fetch applications
        const { data: applicationsData } = await axiosInstance.get("/applications/get");
        setApplications(applicationsData);
  
        console.log("Applications:", applicationsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const [open, setOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const handleOpen = (app) => {
    setSelectedApp(app);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedApp(null);
  };
  const handleNavigation = (section) => {
    setSelectedSection(section);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const handleDeleteService = async () => {
    try {
      await axiosInstance.delete(`/services/${serviceToDelete}`);
      setServices((prev) => prev.filter((service) => service._id !== serviceToDelete));
      setConfirmDelete(false);
    } catch (error) {
      console.error("Error deleting service:", error.response?.data || error.message);
    }
  };
  
  const handleCreateService = async () => {
    try {
      const newService = { name: serviceName, description: serviceDescription };
      const response = await axiosInstance.post("/services/", newService);
      setServices((prev) => [...prev, response.data]); // Add new service to state
      setServiceName("");
      setServiceDescription("");
      setOpenServiceDialog(false);
    } catch (error) {
      console.error("Error creating service:", error.response?.data || error.message);
    }
  };
  
  const handleUpdateService = async () => {
    try {
      const updatedService = { name: serviceName, description: serviceDescription };
      await axiosInstance.put(`/services/${serviceToEdit}`, updatedService);
      
      setServices((prev) =>
        prev.map((service) =>
          service._id === serviceToEdit ? { ...service, ...updatedService } : service
        )
      );
  
      setServiceName("");
      setServiceDescription("");
      setOpenEditServiceDialog(false);
    } catch (error) {
      console.error("Error updating service:", error.response?.data || error.message);
    }
  };
  
  const handleUpdateStatus = async (id, newStatus, newRemarks) => {
    try {
      const response = await axiosInstance.put(`/applications/${id}`, {
        status: newStatus,
        remarks: newRemarks,
      });
  
      if (response.status === 200) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: newStatus, remarks: newRemarks } : app
          )
        );
        console.log("Status updated successfully:", response.data);
        alert("Successfully updated status!");
      } else {
        console.error("Failed to update status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
    }
  };
  
  
    const filteredServices = services.filter(
      (service) => service.name.toLowerCase() || service.category.toLowerCase()
    );
  

 
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: DarkMode ? "#121212" : "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Drawer
  variant="permanent"
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      bgcolor: "#004d40", // Dark green shade
      color: "white",
    },
  }}
>
       <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Avatar
            src={ "/default-avatar.png"}
            sx={{ width: 80, height: 80, mb: 1 }}
          />
          <Typography variant="h6">Admin Panel</Typography>
        </Box>
        <Divider sx={{ bgcolor: "white" }} />
        <List>
          {["Services List", "Application List"].map((text) => (
            <ListItem button key={text} onClick={() => handleNavigation(text)}>
              <ListItemIcon sx={{ color: "white" }}>
                {text === " Services List" ? <Visibility /> : <AssignmentTurnedIn />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon sx={{ color: "white" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        <Toolbar />
        </Drawer>

      {/* Main Content */}
      {/* <Box sx={{ mt: 3 }}>
  <Typography variant="h5" sx={{ color: "#c9e4d9", marginBottom: 3 }}>
    {selectedSection}
  </Typography> */}
  
  {selectedSection === "Services List" && (
  <Box sx={{ padding: 3, backgroundColor:" #bfbfbf" ,width:"90vw"}}>
    {/* Header with Button */}
    <Grid container justifyContent="space-between"  alignItems="center" sx={{ marginBottom: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "##000000" }}>
        Services List
      </Typography>
      <Button
        variant="contained"
        color="success"
        onClick={() => setOpenServiceDialog(true)}
        startIcon={<AddBox />}
        sx={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#2d6a4f",
          borderRadius: "8px",
          boxShadow: 3,
          "&:hover": { backgroundColor: "#1b4332" },
        }}
      >
        Add New Service
      </Button>
    </Grid>

    {/* Table Container */}
    <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4, backgroundColor: "#1b4332" }}>
      <Table>
        <TableHead sx={{ bgcolor: "#2d6a4f" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#f8f9fa", fontSize: "1rem" }}>Service Name</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#f8f9fa", fontSize: "1rem" }}>Description</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#f8f9fa", fontSize: "1rem", textAlign: "center" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <TableRow key={service._id} hover sx={{ "&:hover": { backgroundColor: "#2d6a4f" } }}>
                <TableCell sx={{ color: "#f8f9fa", fontSize: "0.95rem" }}>{service.name}</TableCell>
                <TableCell sx={{ color: "#f8f9fa", fontSize: "0.95rem" }}>{service.description}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="Edit Service" arrow>
                      <IconButton
                        color="primary"
                        sx={{ bgcolor: "#40916c", "&:hover": { bgcolor: "#1b4332" }, color: "#fff" }}
                        onClick={() => {
                          setServiceName(service.name);
                          setServiceDescription(service.description);
                          setServiceToEdit(service._id);
                          setOpenEditServiceDialog(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Service" arrow>
                      <IconButton
                        color="error"
                        sx={{ bgcolor: "#d62828", "&:hover": { bgcolor: "#9b2226" }, color: "#fff" }}
                        onClick={() => {
                          setServiceToDelete(service._id);
                          setConfirmDelete(true);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ color: "#f8f9fa", padding: 3, fontSize: "1rem" }}>
                No services available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
)}
  {selectedSection === "Application List" && (
  <Box sx={{ padding: 3, backgroundColor:" #bfbfbf" ,width:"90vw"}}>
    {/* Header with Button */}
    <Grid container justifyContent="space-between"  alignItems="center" sx={{ marginBottom: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "##000000" }}>
       Applications List
      </Typography>
         </Grid>
         <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4, backgroundColor: "#1b4332" }}>
      <Table>
        <TableHead sx={{ bgcolor: "#2d6a4f" }}>
          <TableRow>
              <TableCell  sx={{ fontWeight: "bold", color: "#f8f9fa", fontSize: "1rem" }}>Applicant</TableCell>
              <TableCell  sx={{ fontWeight: "bold", color: "#f8f9fa", fontSize: "1rem" }}>Service</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#f8f9fa", fontSize: "1rem" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#f8f9fa", fontSize: "1rem" }}>Remarks</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#f8f9fa", fontSize: "1rem" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <TableRow key={app._id} hover>
                  <TableCell sx={{ color: "#f8f9fa" }}>{app.user.name}</TableCell>
                  <TableCell sx={{ color: "#f8f9fa" }}>{app.service.name}</TableCell>
                  <TableCell>
                    <TextField
                      select
                      value={app.status}
                      onChange={(e) => handleUpdateStatus(app._id, e.target.value, app.remarks)}
                      variant="outlined"
                      size="small"
                      sx={{ width: 120 }}
                    >
                      {["Pending", "Approved", "Rejected"].map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={app.remarks}
                      onChange={(e) => handleUpdateStatus(app._id, app.status, e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Application" arrow>
                      <IconButton color="success" onClick={() => handleOpen(app)}>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ color: "#d6e1d3" }}>
                  No applications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Application Details */}
      <Modal open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={open}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80vw", bgcolor: "#2c3e50", boxShadow: 24, p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#ffcc00" }}>
              Application Details
            </Typography>
            {selectedApp && (
              <> 
                <Typography sx={{ color: "#c9e4d9" }}><strong>Applicant:</strong> {selectedApp.userName}</Typography>
                <Typography sx={{ color: "#c9e4d9" }}><strong>Service:</strong> {selectedApp.serviceName}</Typography>
                <Typography sx={{ color: "#c9e4d9" }}><strong>Status:</strong> {selectedApp.status}</Typography>
                <Typography sx={{ color: "#c9e4d9" }}><strong>Remarks:</strong> {selectedApp.remarks || "None"}</Typography>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  )}

  {/* Create Service Dialog */}
  <Dialog open={openServiceDialog} onClose={() => setOpenServiceDialog(false)}>
    <DialogTitle sx={{ backgroundColor: "#388e3c", color: "#fff" }}>Create New Service</DialogTitle>
    <DialogContent>
      <TextField
        label="Service Name"
        fullWidth
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        margin="dense"
        sx={{ bgcolor: "#2c3e50", color: "#c9e4d9", borderRadius: 1 }}
      />
      <TextField
        label="Description"
        fullWidth
        value={serviceDescription}
        onChange={(e) => setServiceDescription(e.target.value)}
        margin="dense"
        multiline
        rows={3}
        sx={{ bgcolor: "#2c3e50", color: "#c9e4d9", borderRadius: 1 }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenServiceDialog(false)} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleCreateService} color="primary">
        Create
      </Button>
    </DialogActions>
  </Dialog>

  {/* Edit Service Dialog */}
  <Dialog open={openEditServiceDialog} onClose={() => setOpenEditServiceDialog(false)}>
    <DialogTitle sx={{ backgroundColor: "#388e3c", color: "#fff" }}>Edit Service</DialogTitle>
    <DialogContent>
      <TextField
        label="Service Name"
        fullWidth
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        margin="dense"
        sx={{ bgcolor: "#2c3e50", color: "#c9e4d9", borderRadius: 1 }}
      />
      <TextField
        label="Description"
        fullWidth
        value={serviceDescription}
        onChange={(e) => setServiceDescription(e.target.value)}
        margin="dense"
        multiline
        rows={3}
        sx={{ bgcolor: "#2c3e50", color: "#c9e4d9", borderRadius: 1 }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenEditServiceDialog(false)} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleUpdateService} color="primary">
        Update
      </Button>
    </DialogActions>
  </Dialog>

  {/* Delete Service Confirmation */}
  <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
    <DialogTitle sx={{ backgroundColor: "#e57373", color: "#fff" }}>Confirm Delete</DialogTitle>
    <DialogContent sx={{ color: "#c9e4d9" }}>
      Are you sure you want to delete this service?
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setConfirmDelete(false)} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleDeleteService} color="error">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
</Box>
// </Box>
  );
};

export default AdminDashboard;
