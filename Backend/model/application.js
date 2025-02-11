const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  details:{ type: String},
  status: { type: String, default: "Pending" },
  remarks: { type: String },

    documents: [
      {
        name: { type: String, required: true },
        data: { type: Buffer, required: true },
      },
    ],
    createdAt: { type: Date, default: Date.now }, 
  });


module.exports = mongoose.model("Application", ApplicationSchema);
