import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "./axiosinterceptor";

const ApplicationStatus = () => {
  const [userApplications, setUserApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const storedUser = localStorage.getItem("user");
      console.log(storedUser)
      if (!storedUser) {
        console.error("User not found in localStorage");
        return;
      }
      const parsedUser = JSON.parse(storedUser); 
      const userId = parsedUser._id;
      
      if (!userId) {
        console.error("No user ID found, cannot fetch applications.");
        return;
      }

      try {
        const res = await axiosInstance.get(`/applications/${userId}`);
        setUserApplications(res.data);
        console.log("Applications fetched:", res.data);
      } catch (error) {
        console.error("Error fetching applications:", error.response?.data || error.message);
      }
    };

    fetchApplications();
  }, []);

  return (
    <Box>
      {userApplications.length > 0 ? (
        userApplications.map((app) => (
          <Box key={app._id} sx={{ padding: 2, border: "1px solid #ddd", marginBottom: "10px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
            <Typography variant="h6">{app.service?.name || "Unknown Service"}</Typography>
            <Typography variant="body2">
              <strong>Status:</strong> {app.status}
            </Typography>
            <Typography variant="body2"><strong>Date Applied:</strong> {new Date(app.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography>No applications found.</Typography>
      )}
    </Box>
  );
};

export default ApplicationStatus;
