import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "./axiosinterceptor";
import { Chip } from "@mui/material";
import moment from "moment";

const ApplicationStatus = () => {
  const [userApplications, setUserApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const storedUser = localStorage.getItem("user");
      console.log("Stored User:", storedUser); // ✅ Debugging Log
  
      if (!storedUser) {
        console.error("User not found in localStorage");
        return;
      }
  
      const parsedUser = JSON.parse(storedUser);
      console.log("Parsed User:", parsedUser); // ✅ Debugging Log
  
      if (!parsedUser.id) {
        console.error("No user ID found, cannot fetch applications.");
        return;
      }
  
      try {
        const res = await axiosInstance.get(`/applications/${parsedUser.id}`);
        console.log("Applications API Response:", res.data); // ✅ Debugging Log
        setUserApplications(res.data);
      } catch (error) {
        console.error(
          "Error fetching applications:",
          error.response?.data || error.message
        );
      }
    };
  
    fetchApplications();
  }, []);
  
  const getStatusChip = (status) => {
    switch (status) {
      case "Approved":
        return <Chip label="Approved" color="success" variant="filled" />;
      case "Rejected":
        return <Chip label="Rejected" color="error" variant="filled" />;
      case "Pending":
      default:
        return <Chip label="Pending" color="warning" variant="outlined" />;
    }
  };
  return (
    <Box>
      {userApplications.length > 0 ? (
        userApplications.map((app) => (
          <Box
            key={app._id}
            sx={{
              padding: 2,
              border: "1px solid #ddd",
              marginBottom: "10px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6">
              {app.service?.name || "Unknown Service"}
            </Typography>
            <Typography variant="h6">
              {app.details || "Unknown Service"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <strong>Status:</strong>&nbsp; {getStatusChip(app.status)}
            </Typography>
            <Typography variant="body2">
              <strong>Remarks:</strong> {app.remarks|| "Nil"}
            </Typography>
            <Typography variant="body2">
  <strong>Date Applied:</strong>
    {app.createdAt ? moment(app.createdAt).format("DD-MM-YYYY") : "N/A"} 
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
