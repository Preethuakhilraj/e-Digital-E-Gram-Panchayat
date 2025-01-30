import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Typography, Avatar } from "@mui/material";
import { Dashboard, Assignment, Person, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
const Sidebar = ({ onNavigate }) => {
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
          src="/assets/user-avatar.png"
          alt="User Avatar"
          sx={{
            width: 70,
            height: 70,
            marginBottom: 1,
            border: "2px solid white",
          }}
        />
        <Typography variant="h6">John Doe</Typography>
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

export default Sidebar;

