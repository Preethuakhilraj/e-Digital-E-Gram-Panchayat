const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "Pending" },
  remarks: { type: String },
  documents: [
    {
      name: { type: String, required: true },
      data: { type: Buffer, required: true }, // Ensure this matches your upload format
    },
  ],
});


module.exports = mongoose.model("Application", ApplicationSchema);
