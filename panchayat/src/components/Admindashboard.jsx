import { useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, IconButton, InputBase, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material";
import { AddBox, Edit, Delete, Visibility, Logout, Search, AdminPanelSettings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateService from "./Createservice";
const drawerWidth = 240;

// Sample data for services and applications
const initialServices = [
  { id: 1, name: "Water Supply", description: "Water supply service for villages." },
  { id: 2, name: "Road Maintenance", description: "Repairing damaged village roads." }
];

const initialApplications = [
  { id: 1, applicant: "John Doe", service: "Water Supply", status: "Pending" },
  { id: 2, applicant: "Jane Smith", service: "Road Maintenance", status: "Approved" }
];

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Create Service");
  const [services, setServices] = useState(initialServices);
  const [applications, setApplications] = useState(initialApplications);

  const navigate=useNavigate();
  // Handlers
  const handleNavigation = (section) => {
    setSelectedSection(section);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleUpdateStatus = (id, newStatus) => {
    setApplications(applications.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

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
          <ListItem button onClick={() => handleNavigation("Create Service")}>
            <ListItemIcon><AddBox sx={{ color: "white" }} /></ListItemIcon>
            <ListItemText primary="Create Service" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("Service List")}>
            <ListItemIcon><Visibility sx={{ color: "white" }} /></ListItemIcon>
            <ListItemText primary="Service List" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("Application List")}>
            <ListItemIcon><Edit sx={{ color: "white" }} /></ListItemIcon>
            <ListItemText primary="Application List" />
          </ListItem>
                  </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Top Navigation Bar */}
        <AppBar position="static" sx={{ backgroundColor: "#f8f9fa", color: "#333", boxShadow: "none", borderBottom: "1px solid #ddd" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Search Bar */}
            <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#fff", padding: "5px 10px", borderRadius: "8px", border: "1px solid #ddd" }}>
              <Search sx={{ color: "#555", marginRight: "5px" }} />
              <InputBase placeholder="Search services..." sx={{ width: "250px" }} />
            </Box>

            {/* Admin Profile & Actions */}
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

        {/* Content Area */}
        <Box sx={{ padding: 3 }}>
          <Typography variant="h5">{selectedSection}</Typography>

          {/* Create Service */}
          {selectedSection === "Create Service" && (
  <CreateService
    onCreate={(newService) => setServices((prevServices) => [...prevServices, newService])}
  />
)}


          {/* Service List */}
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
                  {services.map(service => (
                    <TableRow key={service.id}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>{service.description}</TableCell>
                      <TableCell>
                        <IconButton color="primary"><Edit /></IconButton>
                        <IconButton color="error" onClick={() => handleDeleteService(service.id)}><Delete /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Application List */}
          {selectedSection === "Application List" && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Applicant</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map(app => (
                    <TableRow key={app.id}>
                      <TableCell>{app.applicant}</TableCell>
                      <TableCell>{app.service}</TableCell>
                      <TableCell>
                        <TextField
                          select
                          value={app.status}
                          onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                          variant="outlined"
                          size="small"
                        >
                          {["Pending", "Approved", "Rejected"].map(status => (
                            <MenuItem key={status} value={status}>{status}</MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Create Service Component
// const CreateService = ({ onCreate }) => {
//   const [open, setOpen] = useState(false);
//   const [service, setService] = useState({ name: "", description: "" });

//   return (
//     <>
//       <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Service</Button>
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Create New Service</DialogTitle>
//         <DialogContent>
//           <TextField label="Service Name" fullWidth onChange={(e) => setService({ ...service, name: e.target.value })} />
//           <TextField label="Description" fullWidth onChange={(e) => setService({ ...service, description: e.target.value })} sx={{ mt: 2 }} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button onClick={() => { onCreate(service); setOpen(false); }} color="primary">Create</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };
// CreateService.propTypes = {
//   onCreate: PropTypes.func.isRequired,  // Validate onCreate as a required function
// };

export default AdminDashboard;
