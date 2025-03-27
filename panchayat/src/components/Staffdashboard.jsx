import { useEffect, useState } from "react";
import axiosInstance from "./axiosinterceptor";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

// Set base API URL from environment variables


// Create an Axios instance
const StaffDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [remarks, setRemarks] = useState({});

  useEffect(() => {
    fetchApplications();
  }, []);

  // Fetch applications using Axios
  const fetchApplications = async () => {
    try {
      const response = await axiosInstance.get("/applications");
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  // Handle status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/applications/${id}`, { status: newStatus });
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle remarks update in state
  const handleRemarkChange = (id, value) => {
    setRemarks((prev) => ({ ...prev, [id]: value }));
  };

  // Submit remarks to backend
  const handleSubmitRemark = async (id) => {
    try {
      await axiosInstance.put(`/applications/${id}`, { remarks: remarks[id] });
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, remarks: remarks[id] } : app))
      );
    } catch (error) {
      console.error("Error updating remarks:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, color: "white", textAlign: "center" }}>
        Staff Dashboard
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: "#1b4332" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Remarks</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app._id}>
                <TableCell sx={{ color: "white" }}>{app.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{app.email}</TableCell>
                <TableCell>
                  <TextField
                    select
                    value={app.status}
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    sx={{
                      width: 120,
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#bbb" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: { backgroundColor: "#2d6a4f", color: "white" },
                      },
                    }}
                  >
                    {["Pending", "Approved", "Rejected"].map((status) => (
                      <MenuItem key={status} value={status} sx={{ color: "white" }}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    value={remarks[app._id] || ""}
                    onChange={(e) => handleRemarkChange(app._id, e.target.value)}
                    placeholder="Enter remarks"
                    variant="outlined"
                    size="small"
                    sx={{
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: "4px",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleSubmitRemark(app._id)}
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StaffDashboard;
