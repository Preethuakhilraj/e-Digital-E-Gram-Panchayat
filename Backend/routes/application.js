// const express = require("express");
// const Application = require("../model/application");

// const router = express.Router();

// // Apply for Service
// const multer = require("multer");

// // Configure Multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// router.post("/apply", upload.array("documents"), async (req, res) => {
//   const { service,user,details,status,remarks } = req.body;
// console.log(" req",req.body);
//   if (!service || !user) {
//     return res.status(400).json({ error: "Required fields are missing" });
//   }

//   try {
//     const application = new Application({
//       service,
//       user,
//       details,
//       status,
//       remarks,
//       documents: req.files.map(file => ({
//         name: file.originalname,
//         data: file.buffer,
//       })),
//     });

//     await application.save();
//     res.status(200).json({ message: "Application submitted successfully", application });

//   } catch (err) {
//     console.error("Error creating application:", err);
//     res.status(500).json({ error: "Something went wrong", details: err.message });
//     console.log(err)
//   }
// });

// router.get("/get", async (req, res) => {
//   try {
//     const applications = await Application.find();
//     res.json(applications);
//     console.log(applications)
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// // router.get("/", async (req, res) => {
// //   try {
// //     const applications = await Application.find().populate([
// //       { path: 'user', select: 'name' },
// //       { path: 'service', select: 'name description' },
// //       { path: 'createdAt', select: 'createdAt' },
// //     ]);

// //     // Send the applications data as a JSON response
// //     res.status(200).json(applications);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // Update Application Status
// router.put("/:id", async (req, res) => {
//   const { status, remarks } = req.body;

//   try {
//     const application = await Application.findByIdAndUpdate(
//       req.params.id,
//       { status, remarks },
//       { new: true }
//     );

//     if (!application) {
//       return res.status(404).json({ error: "Application not found" });
//     }

//     res.status(200).json(application); 
//     console.log("Updating Application:", req.params.id, { status, remarks });
//     // ✅ Explicit status code
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // router.get("/:userId", async (req, res) => {
// //   try {
// //     const userId = req.params.userId;
// //     console.log("Fetching applications for user:", userId);

// //     const applications = await Application.find({ user: userId }).populate([
// //       { path: "user", select: "name" },
// //       { path: "service", select: "name" }
// //     ]);

// //     if (!applications || applications.length === 0) {
// //       return res.status(200).json([]); // ✅ Always return an empty array
// //     }

// //     res.status(200).json(applications);
// //   } catch (err) {
// //     console.error("Error fetching applications:", err);
// //     res.status(500).json({ error: "Failed to fetch applications", details: err.message });
// //   }
// // });

// module.exports = router;
const express = require("express");
const mongoose = require("mongoose");
const Application = require("../model/application");
const multer = require("multer");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @route   POST /applications/apply
 * @desc    Submit a new application
 */
router.post("/apply", upload.array("documents"), async (req, res) => {
  const { service, user, details, status, remarks } = req.body;

  console.log("Request Body:", req.body);

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
      documents: req.files.map((file) => ({
        name: file.originalname,
        data: file.buffer,
      })),
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (err) {
    console.error("Error creating application:", err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
});

/**
 * @route   GET /applications/get
 * @desc    Fetch all applications
 */
router.get("/get", async (req, res) => {
  try {
    const applications = await Application.find().populate([
      { path: "user", select: "name" },
      { path: "service", select: "name description" },
    ]);

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch applications", details: error.message });
  }
});

/**
 * @route   PUT /applications/:id
 * @desc    Update application status and remarks
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, remarks } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Application ID" });
  }

  try {
    const application = await Application.findByIdAndUpdate(
      id,
      { status, remarks },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({ message: "Application updated successfully", application });
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ error: "Failed to update application", details: error.message });
  }
});

/**
 * @route   GET /applications/user/:userId
 * @desc    Fetch applications for a specific user
 */
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid User ID" });
  }

  try {
    const applications = await Application.find({ user: userId }).populate([
      { path: "user", select: "name" },
      { path: "service", select: "name" },
    ]);

    res.status(200).json(applications.length ? applications : []);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ error: "Failed to fetch applications", details: err.message });
  }
});

module.exports = router;
