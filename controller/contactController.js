const { json } = require("express");
const Contact = require("./../models/contactModel");

exports.getAllContact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    // send response
    res.status(200).json({
      status: "success",
      requestAt: req.requestTime,
      result: contacts.length,
      data: {
        // tours: tours,
        contacts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "err",
    });
  }
};

exports.createContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    console.log(req.body);
    res.status(200).json({
      status: "success",
      data: {
        tour: newContact,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "err",
    });
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        contact,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "err",
    });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        contact,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "err",
    });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "error",
    });
  }
};
