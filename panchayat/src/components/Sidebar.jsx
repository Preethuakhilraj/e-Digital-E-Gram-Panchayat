import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Typography, Avatar } from "@mui/material";
import { Dashboard, Assignment, Person, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
const Sidebar = ({ onNavigate, userProfile  }) => {
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    onNavigate(section);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "#00796b",
          color: "white",
          boxSizing: "border-box",
          paddingTop: 2,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 2 }}>
        <Avatar
          src="data:image/jpeg;base64,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"
          alt="User Avatar"
          sx={{
            width: 70,
            height: 70,
            marginBottom: 1,
            border: "2px solid white",
          }}
        />
        <Typography variant="h6">{userProfile.name}</Typography>
      </Box>

      <Divider sx={{ backgroundColor: "white" }} />

      <List>
        <ListItem button onClick={() => handleNavigation("Services List")}>
          <ListItemIcon sx={{ color: "white" }}>
            <Assignment />
          </ListItemIcon>
          <ListItemText primary="Services List" sx={{ color: "white" }} />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("My Profile")}>
          <ListItemIcon sx={{ color: "white" }}>
            <Person />
          </ListItemIcon>
          <ListItemText primary="My Profile" sx={{ color: "white" }} />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("Application Status")}>
          <ListItemIcon sx={{ color: "white" }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Application Status" sx={{ color: "white" }} />
        </ListItem>
      </List>

      <Divider sx={{ backgroundColor: "white" }} />

      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon sx={{ color: "white" }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: "white" }} />
        </ListItem>
      </List>
    </Drawer>
  );
};
Sidebar.propTypes = {
    onNavigate: PropTypes.func.isRequired, // Ensure it's a function and is required
  };
Sidebar.propTypes = {
  userProfile: PropTypes.func.isRequired, // Ensure it's a function and is required
};
export default Sidebar;

