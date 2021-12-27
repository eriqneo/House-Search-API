const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema(
  {
    houseSize: {
      type: String,
      required: [true, "Please Provide House Size"],
      maxlength: 70,
    },
    houseType: {
      type: String,
      required: [true, "Please Provide House Type"],
      maxlength: 50,
    },
    areaIn: {
      type: String,
      required: [true, "Please Provide Where House is Located"],
    },
    price: {
      type: Number,
      required: [true, "Please Provide the House Price"],
    },
    status: {
      type: String,
      enum: ["Rental", "For Sale", "For Hire"],
      default: "Rental",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please Provide User"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("House", HouseSchema);
