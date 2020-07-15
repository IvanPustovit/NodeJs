const argv = require("yargs").argv;

// console.log(argv);
// const { action } = argv;
// console.log(action);

const {
  listContacts,
  addContact,
  removeContact,
  getContactById,
} = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      return listContacts();

    case "get":
      return getContactById(id);

    case "add":
      return addContact(name, email, phone);

    case "remove":
      return removeContact(id);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
