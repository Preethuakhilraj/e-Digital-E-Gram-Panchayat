const express = require("express");
const Application = require("../model/application");

const router = express.Router();

// Apply for Service
router.post("/apply", async (req, res) => {
  const {service,user,status,documents,remarks } = req.body;
  try {
    const application = new Application({ service,user,status,documents,remarks });
    await application.save();
    res.status(200).json({ message: 'Application submitted successfully', application: application });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
});
router.get('/:userId', async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.params.userId });
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications', details: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
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
