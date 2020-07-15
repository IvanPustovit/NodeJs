const fs = require("fs").promises;
const path = require("path");

const constants = require("./constants");

const contactsPath = path.join("db", constants.CONTACTS);

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  console.table(JSON.parse(data));
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, "utf-8");
  const list = JSON.parse(data);
  const contact = list.find((el) => el.id === contactId);
  console.log(contact);
  return contact;
}

async function removeContact(contactId) {
  const list = await listContacts();

  if (!list.find((el) => el.id === contactId)) {
    return;
  }

  const arr = list.filter((el) => el.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(arr), "utf-8");
  listContacts();
}

async function addContact(name, email, phone) {
  const list = await listContacts();
  if (list.find((el) => el.name === name)) {
    return;
  }

  list.push({
    id: 11,
    name: name,
    email: email,
    phone: phone,
  });
  await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8");
  listContacts();
}

module.exports = { listContacts, getContactById, removeContact, addContact };
