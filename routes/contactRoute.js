const express = require("express");
const contactController = require("./../controller/contactController");

const router = express.Router();

router
  .route("/")
  .get(contactController.getAllContact)
  .post(contactController.createContact);

router
  .route("/:id")
  .get(contactController.getContact)
  .patch(contactController.updateContact)
  .delete(contactController.deleteContact);

module.exports = router;
