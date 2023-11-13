const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  hearedFrom: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Contact = new mongoose.model("Contact", contactSchema);

module.exports = Contact;
