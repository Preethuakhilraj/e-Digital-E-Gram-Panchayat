import { useState, useEffect } from "react";
import {
  AppBar,
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
  InputBase,
  CircularProgress,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  Edit,
  Delete,
  Visibility,
  Search,
  AdminPanelSettings,
  Logout,
  AddBox,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Service List");
  const [services, setServices] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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
        const servicesRes = await fetch("http://localhost:4000/services");
        const servicesData = await servicesRes.json();
        setServices(servicesData);

        const applicationsRes = await fetch("http://localhost:4000/applications");
        const applicationsData = await applicationsRes.json();
        setApplications(applicationsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      await fetch(`http://localhost:4000/services/${serviceToDelete}`, { method: "DELETE" });
      setServices((prev) => prev.filter((service) => service._id !== serviceToDelete));
      setConfirmDelete(false);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleCreateService = async () => {
    try {
      const newService = { name: serviceName, description: serviceDescription };
      const response = await fetch("http://localhost:4000/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      });
      const createdService = await response.json();
      setServices((prev) => [...prev, createdService]);
      setServiceName("");
      setServiceDescription("");
      setOpenServiceDialog(false);
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const handleUpdateService = async () => {
    try {
      const updatedService = { name: serviceName, description: serviceDescription };
      await fetch(`http://localhost:4000/services/${serviceToEdit}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedService),
      });
      setServices((prev) =>
        prev.map((service) =>
          service._id === serviceToEdit ? { ...service, ...updatedService } : service
        )
      );
      setServiceName("");
      setServiceDescription("");
      setOpenEditServiceDialog(false);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleUpdateStatus = async (id, newStatus, remarks) => {
    try {
      await fetch(`http://localhost:4000/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, remarks: remarks }),
      });

      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: newStatus, remarks: remarks } : app))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#002b5c",
            color: "white",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => handleNavigation("Service List")}>
            <ListItemIcon>
              <Visibility sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Service List" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("Application List")}>
            <ListItemIcon>
              <Edit sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Application List" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#f8f9fa",
            color: "#333",
            boxShadow: "none",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: "5px 10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            >
              <Search sx={{ color: "#555", marginRight: "5px" }} />
              <InputBase
                placeholder="Search services..."
                sx={{ width: "250px" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ marginRight: "10px" }}>Admin Panel</Typography>
              <Avatar src="/assets/admin-avatar.png" sx={{ marginRight: "10px" }} />
              <IconButton color="inherit">
                <AdminPanelSettings />
              </IconButton>
              <IconButton color="inherit" onClick={handleLogout}>
                <Logout />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ padding: 3 }}>
          <Typography variant="h5">{selectedSection}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenServiceDialog(true)}
            startIcon={<AddBox />}
            sx={{ position: "absolute", top: 80, right: 20, marginBottom: 2 }}
          >
            Add New Service
          </Button>

          {selectedSection === "Service List" && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Service Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                      <TableRow key={service._id}>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>{service.description}</TableCell>
                        <TableCell>
                          <Tooltip title="Update Service" arrow>
                            <IconButton
                              color="primary"
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
                              onClick={() => {
                                setServiceToDelete(service._id);
                                setConfirmDelete(true);
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No services available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {selectedSection === "Application List" && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Applicant</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.length > 0 ? (
                    applications.map((app) => (
                      <TableRow key={app._id}>
                        <TableCell>{app.user}</TableCell>
                        <TableCell>{app.service}</TableCell>
                        <TableCell>
                          <TextField
                            select
                            value={app.status}
                            onChange={(e) =>
                              handleUpdateStatus(app._id, e.target.value, app.remarks)
                            }
                            variant="outlined"
                            size="small"
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
                            onChange={(e) =>
                              handleUpdateStatus(app._id, app.status, e.target.value)
                            }
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title="View Application" arrow>
                            <IconButton color="primary">
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No applications found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>

      {/* Create Service Dialog */}
      <Dialog open={openServiceDialog} onClose={() => setOpenServiceDialog(false)}>
        <DialogTitle>Create New Service</DialogTitle>
        <DialogContent>
          <TextField
            label="Service Name"
            fullWidth
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            margin="dense"
          />
          <TextField
            label="Description"
            fullWidth
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            margin="dense"
            multiline
            rows={3}
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
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          <TextField
            label="Service Name"
            fullWidth
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            margin="dense"
          />
          <TextField
            label="Description"
            fullWidth
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            margin="dense"
            multiline
            rows={3}
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
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
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
  );
};

export default AdminDashboard;
