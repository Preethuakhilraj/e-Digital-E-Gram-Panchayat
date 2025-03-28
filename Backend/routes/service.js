const express = require("express");
const Service = require("../model/service");

const router = express.Router();

// Create Service
router.post("/", async (req, res) => {
  const { name, description, createdBy } = req.body;

  try {
    const service = new Service({ name, description, createdBy });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, createdBy } = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, description, createdBy },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// router.get('/:id', async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) {
//       return res.status(404).json({ message: 'Service not found' });
//     }
//     res.json(service);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });
// Get All Services

// Delete Service
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
