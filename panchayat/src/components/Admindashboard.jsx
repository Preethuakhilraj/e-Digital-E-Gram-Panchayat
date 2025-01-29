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
} from "@mui/material";
import {
  Edit,
  Delete,
  Visibility,
  Search,
  AdminPanelSettings,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Service List");
  const [services, setServices] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch Services and Applications
  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await fetch("http://localhost:5000/api/services");
        const servicesData = await servicesRes.json();
        setServices(servicesData);

        const applicationsRes = await fetch("http://localhost:5000/api/applications");
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

  const handleDeleteService = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/services/${id}`, { method: "DELETE" });
      setServices((prev) => prev.filter((service) => service._id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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
              <InputBase placeholder="Search services..." sx={{ width: "250px" }} />
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
                  {services.length > 0 ? (
                    services.map((service) => (
                      <TableRow key={service._id}>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>{service.description}</TableCell>
                        <TableCell>
                          <IconButton color="error" onClick={() => handleDeleteService(service._id)}>
                            <Delete />
                          </IconButton>
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
                            onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
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
                        <TableCell>{app.remarks}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
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
    </Box>
  );
};

export default AdminDashboard;
