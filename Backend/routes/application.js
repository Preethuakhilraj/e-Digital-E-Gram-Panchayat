const express = require("express");
const Application = require("../model/application");

const router = express.Router();

// Apply for Service
const multer = require("multer");

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/apply", upload.array("documents"), async (req, res) => {
  const { service,user,details,status,remarks } = req.body;
console.log(" req",req.body);
  if (!service || !user) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    const application = new Application({
      service,
      user,
      details,
      status,
      remarks,
      documents: req.files.map(file => ({
        name: file.originalname,
        data: file.buffer,
      })),
    });

    await application.save();
    res.status(200).json({ message: "Application submitted successfully", application });

  } catch (err) {
    console.error("Error creating application:", err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
    console.log(err)
  }
});




router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().populate([
      { path: 'user', select: 'name' },
      { path: 'service', select: 'name description' },
      { path: 'createdAt', select: 'createdAt' },
    ]);

    // Send the applications data as a JSON response
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Application Status
router.put("/:id", async (req, res) => {
  const { status, remarks } = req.body;

  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status, remarks },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json(application); 
    console.log("Updating Application:", req.params.id, { status, remarks });
    // ✅ Explicit status code
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; 
    console.log("Fetching applications for user:", userId);
    const applications = await Application.find().populate([
      { path: 'user', select: 'name' },
      { path: 'service', select: 'name' }
    ]);
    // Application.find({ user: userId }).populate("service"); // ✅ Ensure correct field name
    // const applications = await Application.find()
    // .populate('user', 'name')      
    // .populate('service', 'name')        // Populating 'name' from 'user'
    // .populate('service', 'description');   // Populating both 'name' & 'details' from 'service'
  
  res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ error: "Failed to fetch applications", details: err.message });
  }
});
module.exports = router;
