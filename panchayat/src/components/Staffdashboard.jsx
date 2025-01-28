import  { useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, IconButton, InputBase, Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Visibility, AssignmentTurnedIn, Logout, Search, Work } from "@mui/icons-material";

const drawerWidth = 240;

const StaffDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("View Services");

  const handleNavigation = (section) => {
    setSelectedSection(section);
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
            backgroundColor: "#004d40",
            color: "white",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => handleNavigation("View Services")}>
            <ListItemIcon><Visibility sx={{ color: "white" }} /></ListItemIcon>
            <ListItemText primary="View Services" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("Update Application Status")}>
            <ListItemIcon><AssignmentTurnedIn sx={{ color: "white" }} /></ListItemIcon>
            <ListItemText primary="Update Application Status" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("Logout")}>
            <ListItemIcon><Logout sx={{ color: "white" }} /></ListItemIcon>
            <ListItemText primary="Logout" />
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

            {/* Staff Profile & Actions */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ marginRight: "10px" }}>Staff Panel</Typography>
              <Avatar src="/assets/staff-avatar.png" sx={{ marginRight: "10px" }} />
              <IconButton color="inherit">
                <Work />
              </IconButton>
              <IconButton color="inherit">
                <Logout />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Box sx={{ padding: 3 }}>
          <Typography variant="h5">{selectedSection}</Typography>
          {selectedSection === "View Services" && <Typography>Staff can view all available services here.</Typography>}
          {selectedSection === "Update Application Status" && <Typography>Update application status for assigned requests.</Typography>}
          {selectedSection === "Logout" && <Typography>Logging out...</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default StaffDashboard;
