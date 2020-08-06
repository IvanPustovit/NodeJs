const fs = require("fs").promises;
const path = require("path");

const constants = require("./constants");
const Joi = require("joi");

const contactsPath = path.join("db", constants.CONTACTS);

function validateBody(req, res, next) {
  const validBodyRes = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });
  const { error, value } = validBodyRes.validate(req.body);
  
  if (error) {
    return res.status(400).send({ message: "missing required name field" });
  }
  next();
}

async function listContacts(req, res) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return res.status(200).send(data);
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function getContactById(req, res) {
  try {
    const { contactId } = req.params;
    const data = await fs.readFile(contactsPath, "utf-8");
    const list = JSON.parse(data);

    const contact = list.find((el) => el.id === Number(contactId));

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

    const data = await fs.readFile(contactsPath, "utf-8");
    const list = JSON.parse(data);
    console.log(contactId);
    if (!list.find((el) => el.id === Number(contactId))) {
      res.status(404).send({ message: "Not found" });
      return;
    }
    const arr = list.filter((el) => el.id !== Number(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(arr), "utf-8");
    res.status(200).send({ message: "contact deleted" });
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function addContact(req, res) {
  try {
    const list = await fs.readFile(contactsPath, "utf-8");
    const arr = JSON.parse(list);
    const newContact = { ...req.body, id: arr.length + 1 };

    const isContact = arr.find(
      (el) =>
        el.name === newContact.name ||
        el.email === newContact.email ||
        el.phone === newContact.phone,
    );

    if (isContact) {
      res
        .status(200)
        .send({ message: "Сontact with such name or email or phone is" });
      return;
    }
    arr.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(arr), "utf-8", (err) => {
      if (err) throw err;
      console.log("contact added");
    });
    res.status(201).send(newContact);
  } catch (error) {
    console.log("Error", error);
  }
}

async function updateContact(req, res) {
  try {
    const contactId = req.params.contactId;
    const list = await fs.readFile(contactsPath, "utf-8");
    const arr = JSON.parse(list);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).send({ message: "missing fields" });
    }
    let contactIndex = arr.findIndex((el) => el.id === Number(contactId));
    if (!arr[contactIndex]) {
      res.status(404).send({ message: "Not found" });
    }
    arr[contactIndex] = { ...arr[contactIndex], name, email, phone };
    await fs.writeFile(contactsPath, JSON.stringify(arr), "utf-8", (err) => {
      if (err) throw err;
      console.log("contact added");
    });
    res.status(200).send(arr[contactIndex]);
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
  validateBody,
};
