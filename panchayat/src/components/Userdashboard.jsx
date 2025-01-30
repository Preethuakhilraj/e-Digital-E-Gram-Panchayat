import { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, Typography} from "@mui/material";
import ApplyService from "./Applyservice";
import UserProfile from "./Userprofile";
import ApplicationStatus from "./Applicationstatus";
import Sidebar from "./Sidebar";

const MainDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Services List");
  const [userProfile, setUserProfile] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "",
  });
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUserProfile(storedUser);
      }
    };
    fetchUserProfile();
  }, []);

  const handleNavigation = (section) => {
    setSelectedSection(section);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f4f6f9" }}>
      <Sidebar onNavigate={handleNavigation} />
      <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: "white", borderRadius: "8px", boxShadow: 2 }}>
        <AppBar position="static" sx={{ backgroundColor: "#00796b", color: "white", boxShadow: 3 }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">{selectedSection}</Typography>
                     </Toolbar>
        </AppBar>

        <Box sx={{ padding: 2 }}>
          {selectedSection === "Services List" && <ApplyService />}
          {selectedSection === "My Profile" && <UserProfile userProfile={userProfile} />}
          {selectedSection === "Application Status" && <ApplicationStatus />}
        </Box>
      </Box>
    </Box>
  );
};

export default MainDashboard;
