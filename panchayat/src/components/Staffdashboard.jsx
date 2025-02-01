import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  InputBase,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Divider,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Switch,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  Visibility,
  AssignmentTurnedIn,
  Logout,
  Search,
  DarkMode,
  LightMode,
} from "@mui/icons-material";

const drawerWidth = 260;

const StaffDashboard = ({ userProfile }) => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("View Services");
  const [services, setServices] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await fetch("http://localhost:4000/services");
        const servicesData = await servicesRes.json();
        setServices(servicesData);

        const applicationsRes = await fetch(
          "http://localhost:4000/applications"
        );
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
    if (section === "Logout") handleLogout();
    else setSelectedSection(section);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleThemeToggle = () => setDarkMode(!darkMode);

  const handleUpdateStatus = (id, status, remarks) => {
    // Update application status logic
    const updatedApplications = applications.map((app) =>
      app._id === id ? { ...app, status, remarks } : app
    );
    setApplications(updatedApplications);
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: darkMode ? "#121212" : "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: darkMode ? "#1e1e1e" : "#004d40",
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
            src={userProfile?.avatar || "/default-avatar.png"}
            sx={{ width: 80, height: 80, mb: 1 }}
          />
          <Typography variant="h6">Staff Panel</Typography>
        </Box>
        <Divider sx={{ bgcolor: "white" }} />
        <List>
          {["View Services", "Update Application Status"].map((text) => (
            <ListItem button key={text} onClick={() => handleNavigation(text)}>
              <ListItemIcon sx={{ color: "white" }}>
                {text === "View Services" ? <Visibility /> : <AssignmentTurnedIn />}
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
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* App Bar */}
        <AppBar
          position="static"
          sx={{
            bgcolor: darkMode ? "#333" : "#f8f9fa",
            color: darkMode ? "#fff" : "#333",
            boxShadow: "none",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Search sx={{ color: "#555", mr: 1 }} />
              <InputBase
                placeholder="Search services..."
                sx={{ width: 250 }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 2 }}>Theme</Typography>
              <Switch checked={darkMode} onChange={handleThemeToggle} />
              <IconButton color="inherit" onClick={handleThemeToggle}>
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {selectedSection}
          </Typography>

          {/* View Services Section */}
          {selectedSection === "View Services" && (
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: darkMode ? "#1e1e1e" : "#fff",
                boxShadow:
                  darkMode
                    ? "0px 4px 10px rgba(255,255,255,0.1)"
                    : "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height={100}>
                  <CircularProgress color="secondary" />
                </Box>
              ) : (
                <Stack spacing={2}>
                  {services.map((service) => (
                    <Paper
                      key={service._id}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: darkMode ? "#333" : "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Avatar sx={{ bgcolor: darkMode ? "#FFD700" : "#47916b" }}>
                        {service.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="h6">{service.name}</Typography>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Paper>
          )}

          {/* Update Application Status Section */}
          {selectedSection === "Update Application Status" && (
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
                            onChange={(e) => handleUpdateStatus(app._id, e.target.value, app.remarks)}
                            variant="outlined"
                            size="small"
                          >
                            {["Pending", "Approved", "Rejected"].map((status) => (
                              <MenuItem key={status} value={status}>{status}</MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                        <TableCell>{app.remarks}</TableCell>
                        <TableCell>
                          <Tooltip title="View Application">
                            <IconButton color="primary"><Visibility /></IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell colSpan={5} align="center">No applications found</TableCell></TableRow>
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
StaffDashboard.propTypes = {
  userProfile: PropTypes.func.isRequired, // Ensure it's a function and is required
};
export default StaffDashboard;
