import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { Visibility, AssignmentTurnedIn, Delete, Edit } from "@mui/icons-material";
import axiosInstance from "../utils/axiosInstance";

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get("/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.category && service.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEdit = (service) => {
    setCurrentService(service);
    setEditModalOpen(true);
  };

  const handleDeleteService = async () => {
    if (!currentService) return;
    try {
      await axiosInstance.delete(`/services/${currentService._id}`);
      setServices((prev) => prev.filter((s) => s._id !== currentService._id));
      setConfirmDelete(false);
      alert("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error.response?.data || error.message);
      alert("Failed to delete service. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{ width: 240, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box", backgroundColor: "#2c3e50", color: "white" } }}
      >
        <List>
          {["Services List", "Application List"].map((text) => (
            <ListItem button key={text}>
              <ListItemIcon sx={{ color: "white" }}>{text === "Services List" ? <Visibility /> : <AssignmentTurnedIn />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <TextField
          label="Search Services"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {/* Services List */}
        {filteredServices.map((service) => (
          <Box key={service._id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, border: "1px solid #ccc", borderRadius: 2, mb: 2 }}>
            <Typography>{service.name}</Typography>
            <Box>
              <Button variant="outlined" color="primary" startIcon={<Edit />} onClick={() => handleEdit(service)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => { setCurrentService(service); setConfirmDelete(true); }} sx={{ ml: 2 }}>
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box sx={{ p: 4, backgroundColor: "white", width: 400, margin: "auto", mt: 5, borderRadius: 2 }}>
          <Typography variant="h6">Edit Service</Typography>
          <TextField fullWidth margin="normal" label="Service Name" defaultValue={currentService?.name} />
          <TextField fullWidth margin="normal" label="Category" defaultValue={currentService?.category} />
          <Button variant="contained" color="primary">Save Changes</Button>
        </Box>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <Box sx={{ p: 4, backgroundColor: "white", width: 400, margin: "auto", mt: 5, borderRadius: 2, textAlign: "center" }}>
          <Typography variant="h6">Are you sure you want to delete this service?</Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="error" onClick={handleDeleteService}>Yes, Delete</Button>
            <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setConfirmDelete(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;
