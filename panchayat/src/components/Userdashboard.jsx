import { useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, IconButton, InputBase, Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Home, Logout, Person, Search, Work, Assignment } from "@mui/icons-material";

const drawerWidth = 240;

const UserDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Apply Service");

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
            backgroundColor: "#001f3f",
            color: "white",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => handleNavigation("Apply Service")}>
            <ListItemIcon><Work sx={{ color: "white" }} /></ListItemIcon>
            <ListItemText primary="Apply Service" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("My Profile")}>
            <ListItemIcon><Person sx={{ color: "white" }} /></ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("Application Status")}>
            <ListItemIcon><Assignment sx={{ color: "white" }} /></ListItemIcon>
            <ListItemText primary="Application Status" />
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

            {/* User Profile & Actions */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ marginRight: "10px" }}>Welcome, User</Typography>
              <Avatar src="/assets/user-avatar.png" sx={{ marginRight: "10px" }} />
              <IconButton color="inherit">
                <Home />
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
          {selectedSection === "Apply Service" && <Typography>Here you can apply for new services.</Typography>}
          {selectedSection === "My Profile" && <Typography>Your profile details will be displayed here.</Typography>}
          {selectedSection === "Application Status" && <Typography>Check your application status here.</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashboard;
