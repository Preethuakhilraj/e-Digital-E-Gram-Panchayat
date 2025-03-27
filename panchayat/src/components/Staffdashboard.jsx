import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Typography,
  Avatar,
  IconButton,
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
  Stack,
  TextField,
  MenuItem,
  Grid2,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import {
  Visibility,
  AssignmentTurnedIn,
  Logout,
  Edit,
 } from "@mui/icons-material";
import axiosInstance from "./axiosinterceptor";

const drawerWidth = 260;

const StaffDashboard = ({ userProfile }) => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("View Services");
  const [services, setServices] = useState([]);
    const [open, setOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
    const [applications, setApplications] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch services
          const { data: servicesData } = await axiosInstance.get("/services");
          setServices(servicesData);
    
          // Fetch applications
          const { data: applicationsData } = await axiosInstance.get("/applications");
          setApplications(applicationsData);
    
          console.log("Applications:", applicationsData);
        } catch (error) {
          console.error("Error fetching data:", error);
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
  const handleRemarksChange = (appId, newRemarks) => {
    setApplications((prevApps) =>
      prevApps.map((app) =>
        app._id === appId ? { ...app, remarks: newRemarks } : app
      )
    );
  };
  const handleStatusChange = (appId, newStatus) => {
    setApplications((prevApps) =>
      prevApps.map((app) =>
        app._id === appId ? { ...app, status: newStatus } : app
      )
    );
  };
  const handleOpen = (app) => {
    setSelectedApp(app);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedApp(null);
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
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#f8f9fa",
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
            bgcolor:  "#004d40",
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
        <Divider sx={{ bgcolor: "white" ,marginTop:3}} />
        <List>
          {["View Services", "Application List"].map((text) => (
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
      <Box sx={{ padding: 3, backgroundColor: " #bfbfbf", width: "90vw" }}>
        {/* App Bar */}
                  
        <Box sx={{ mt: 3 }}>
          <Typography   variant="h5" sx={{ fontWeight: "bold", color: "##000000" }}>
            {selectedSection}
          </Typography>

          {/* View Services Section */}
          {selectedSection === "View Services" && (
            <Paper
              sx={{
                padding: 3,
               marginTop:4,
                borderRadius: 3,
                bgcolor:  "#fff",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",     
              }}
            >
              { (
                <Box display="flex" justifyContent="center" alignItems="center" height={100}>
                  <CircularProgress color="secondary" />
                </Box>
              ) (
                <Stack spacing={2}>
                  {services.map((service) => (
                    <Paper
                      key={service._id}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor:  "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Avatar sx={{ bgcolor:  "#47916b" }}>
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
          {selectedSection === "Application List"  && (
        <Box sx={{ padding: 3, backgroundColor: " #bfbfbf"}}>
          {/* Header with Button */}
          <Grid2
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: 2 }}
          >
            </Grid2>
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 3, boxShadow: 4, backgroundColor: "#1b4332" }}
          >
            <Table>
              <TableHead sx={{ bgcolor: "#2d6a4f" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#f8f9fa",
                      fontSize: "1rem",
                    }}
                  >
                    Applicant
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#f8f9fa",
                      fontSize: "1rem",
                    }}
                  >
                    Service
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#f8f9fa",
                      fontSize: "1rem",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#f8f9fa",
                      fontSize: "1rem",
                    }}
                  >
                    Remarks
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#f8f9fa",
                      fontSize: "1rem",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <TableRow key={app._id} hover>
                      <TableCell sx={{ color: "#f8f9fa" }}>
                        {app.user.name}
                      </TableCell>
                      <TableCell sx={{ color: "#f8f9fa" }}>
                        {app.service.name}
                      </TableCell>
                      <TableCell>
                      <TextField
  select
  value={app.status}
  variant="outlined"
  size="small"
  onChange={(e) => handleStatusChange(app._id, e.target.value)}  // ✅ Correct placement
  sx={{
    width: 120,
    color: "white",
    "& .MuiInputBase-input": { color: "white" },
  }}
>
  {["Pending", "Approved", "Rejected"].map((status) => (
    <MenuItem
      key={status}
      value={status}
      sx={{
        color: "white",
        backgroundColor: "#333",
        "&:hover": { backgroundColor: "#444" },
      }}
    >
      {status}
    </MenuItem>
  ))}
</TextField>

                      </TableCell>
                      <TableCell>
  <TextField
    value={app.remarks}
    onChange={(e) => handleRemarksChange(app._id, e.target.value)} // To handle remarks change
    variant="outlined"
    size="small"
    sx={{
      width: "100%",
      color: "white",
      backgroundColor: "#333",
      "& .MuiInputBase-input": { color: "white" },
    }}
  />
</TableCell>

<TableCell align="center">
  <Tooltip title="View Application" arrow>
    <IconButton color="success" onClick={() => handleOpen(app)}>
      <Visibility />
    </IconButton>
  </Tooltip>

  <Tooltip title="Update Status" arrow>
  <IconButton
  color="primary"
  onClick={() => handleUpdateStatus(app._id, app.status, app.remarks)}  // ✅ Pass required params
>
  <Edit />
</IconButton>
  </Tooltip>
</TableCell>

                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="center"
                      sx={{ color: "#d6e1d3" }}
                    >
                      No applications found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Modal for Application Details */}
          <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
          >
            <Fade in={open}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "60%",
                  transform: "translate(-50%, -20%)",
                  width: "50%",
                  bgcolor: "#2d6a4f",
                  boxShadow: 24,
                  p: 5,
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 2, color: "white" }}
                >
                  Application Details
                </Typography>
                {selectedApp && (
                  <>
                    <Typography sx={{ color: "#c9e4d9" }}>
                      <strong>Applicant:</strong> {selectedApp.user.name}
                    </Typography>
                    <Typography sx={{ color: "#c9e4d9" }}>
                      <strong>Service:</strong> {selectedApp.service.name}
                    </Typography>
                    <Typography sx={{ color: "#c9e4d9" }}>
                      <strong>Status:</strong> {selectedApp.status}
                    </Typography>
                    <Typography sx={{ color: "#c9e4d9" }}>
                      <strong>Remarks:</strong> {selectedApp.remarks || "None"}
                    </Typography>
                  </>
                )}
              </Box>
            </Fade>
          </Modal>
        </Box>
      )}
        </Box>
      </Box>
    </Box>
  );
};
StaffDashboard.propTypes = {
  userProfile: PropTypes.object.isRequired,
};

export default StaffDashboard;
