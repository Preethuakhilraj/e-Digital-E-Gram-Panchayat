import { useState, useEffect } from "react";
import { 
  Box, Button, Paper, Typography, CircularProgress, 
  Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, Input 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosinterceptor";

const ApplyService = () => {
  const [services, setServices] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [applicationData, setApplicationData] = useState({
    service: "",
    user: "",
    status: "Pending",
    documents: [],
    remarks: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosInstance.get("/services");
        setServices(res.data);
        console.log(services)
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Open modal and autofill user details
  const handleOpenModal = (service) => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("You must be logged in to apply for a service.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    setSelectedService(service);
    setApplicationData({
      service: service._id,
      user: user._id,
      status: "Pending",
      documents: [],
      remarks: "",
    });
    setOpen(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    setApplicationData({
      ...applicationData,
      documents: [...e.target.files], // Store uploaded files
    });
  };

  // Submit application
  const handleSubmitApplication = async () => {
    setLoadingId(selectedService._id);

    try {
      const formData = new FormData();
      console.log(applicationData);
      formData.append("service", applicationData.service);
      formData.append("user", applicationData.user);
      formData.append("status", applicationData.status);
      formData.append("remarks", applicationData.remarks);

      // Append files
      applicationData.documents.forEach((file) => {
        formData.append("documents", file);
      });
      const response = await axiosInstance.post("/applications/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("Successfully applied for the service!");
      }
    } catch (error) {
      console.error("Error applying for service:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoadingId(null);
      setOpen(false);
    }
  };

  return (
    <Box>
      {services.length > 0 ? (
        services.map((service) => (
          <Paper
            key={service._id}
            sx={{
              padding: 2,
              marginBottom: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>{service.name}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenModal(service)}
              disabled={loadingId === service._id}
            >
              {loadingId === service._id ? <CircularProgress size={24} color="inherit" /> : "Apply"}
            </Button>
          </Paper>
        ))
      ) : (
        <Typography>No services available at the moment.</Typography>
      )}

      {/* Dialog Box for Application */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Apply for {selectedService?.name}</DialogTitle>
        <Typography style={{ marginLeft: '25px' }}>
  {selectedService?.description}
</Typography>
        <DialogContent>
            <TextField
            fullWidth
            label="Remarks"
            name="remarks"
            value={applicationData.remarks}
            onChange={handleChange}
            margin="dense"
            multiline
            rows={3}
          />
          <Typography variant="body1" sx={{ marginTop: 2 }}>Upload Supporting Documents</Typography>
          <Input
            type="file"
            multiple
            onChange={handleFileUpload}
            style={{ marginTop: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitApplication} color="primary" variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApplyService;
