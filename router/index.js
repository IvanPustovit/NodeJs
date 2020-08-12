const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../controllers/contacts");
const router = express.Router();

router.get("/", listContacts);
router.get("/:contactId", getContactById);
router.post("/", addContact);
router.delete("/:contactId", removeContact);
router.patch("/:contactId", updateContact);

module.exports = router;
