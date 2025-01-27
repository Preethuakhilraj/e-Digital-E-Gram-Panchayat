const express = require("express");
const Application = require("../model/application");

const router = express.Router();

// Apply for Service
router.post("/", async (req, res) => {
  const { service, user, remarks } = req.body;

  try {
    const application = new Application({ service, user, remarks });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Application Status
router.put("/:id", async (req, res) => {
  const { status } = req.body;

  try {
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
