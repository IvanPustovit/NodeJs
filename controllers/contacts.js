const fs = require("fs").promises;
const path = require("path");

const constants = require("../constants/constants");

const contactDatabase = require("../srv/dbConect");
const ContactModel = require("../models/ContactModel");

const contactsPath = contactDatabase();

async function listContacts(req, res) {
  try {
    const data = await ContactModel.find({});

    res.status(200).send(data);
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function getContactById(req, res) {
  try {
    const { contactId } = req.params;
    const contact = await ContactModel.findById({ _id: contactId });

    if (!contact) {
      res.status(400).send({ message: "Not found" });
    }
    res.status(200).send(contact);
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function removeContact(req, res) {
  try {
    const { contactId } = req.params;

    await ContactModel.findByIdAndDelete({ _id: contactId });

    res.status(200).send({ message: "contact deleted" });
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function addContact(req, res) {
  try {
    const { name, email, phone, password, subscription } = req.body;

    const newContact = await ContactModel.create({
      name,
      email,
      phone,
      password,
      subscription,
    });

    if (!newContact) {
      return res.status(404).send({ message: "Somethisng is wrong" });
    }
    res.status(201).send(newContact);
  } catch (error) {
    console.log("Error", error);
  }
}

async function updateContact(req, res) {
  try {
    const contactId = req.params.contactId;
    const { name, email, phone, password, subscription } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).send({ message: "missing fields" });
    }

    const contact = ContactModel.findByIdAndUpdate(
      { _id: contactId },
      { name, email, phone, password, subscription },
    );

    res.status(200).send(contact);
  } catch (error) {
    console.log("ERROR", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
