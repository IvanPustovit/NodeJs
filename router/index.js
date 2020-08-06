const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  validateBody,
} = require("../contacts");
const router = express.Router();

router.get("/", listContacts);
router.get("/:contactId", getContactById);
router.post("/", validateBody, addContact);
router.delete("/:contactId", removeContact);
router.patch("/:contactId", validateBody, updateContact);

module.exports = router;
