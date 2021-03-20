0. npm init -y
0. npm i json-server [...] npm i express joi cors //check again
0. data-access-layer folder - place json.
0. app.js:
const express = require("express");
const cors = require("cors");
const contactsController = require("./controller/contacts-controller");
const server = express();
server.use(cors()); 
server.use(express.json());
server.use("/api/contacts", contactsController);
server.listen(3000, () => console.log("Listening on http://localhost:3000"));



0. bll - contact-logic:
function getAllContactsAsync() {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (err, contacts) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(contacts));
        });
    });
}
function saveAllContactsAsync(contacts) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, JSON.stringify(contacts, null, 4), err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}
async function addContactAsync(contact) {
    const allContacts = await getAllContactsAsync();
    contact.id = allContacts.length + 1;
    allContacts.push(contact);
    await saveAllContactsAsync(allContacts);
    return contact;
}
module.exports = {
    getAllContactsAsync,
    saveAllContactsAsync,
    addContactAsync
};

0. ctrl - contact-controller:
const express = require("express");
const contactsLogic = require("../business-logic-layer/contact-logic");
const ContactModel = require("../models/contact-model");
const router = express.Router();
// GET http://localhost:3000/api/contacts
router.get("/", async (request, response) => {
    try {
        const contacts = await contactsLogic.getAllContactsAsync();
        response.json(contacts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// POST http://localhost:3000/api/contacts
router.post("/", async (request, response) => {
    try {
        const contact = request.body;
        if( !contact.fullName ||!contact.mail ||!contact.phone || !contact.address){
            response.status(401).send("missing a field, try again")
            throw("missing a field, try again")
        }
        const errors = ContactModel.validate(contact);
        if (errors) {
            response.status(400).send(errors);
            return;
        }
        const addedContact = await contactsLogic.addContactAsync(contact);
        response.status(201).json(addedContact);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
module.exports = router;

0. models // contact-model : 
const Joi = require("joi");
class ContactModel {
  constructor(id, fullName, mail, phone, address) {
    this.id = id;
    this.fullName = fullName;
    this.mail = mail;
    this.phone = phone;
    this.address = address;
  }
  static validate(contact) {
    const validationSchema = {
      id: Joi.number().min(1),
      fullName: Joi.string().required().min(2).max(50),
      mail: Joi.string().required().min(6).max(1000),
      phone: Joi.string().required().min(7).max(1000),
      address: Joi.string().required().min(4).max(1000),
    }
    // const error = Joi.validate(contact, validationSchema, { abortEarly: false })
    //   .error;
    // if (error) {
    //   return error.details.map((err) => err.message);
    // }

    return null;
  }
}
module.exports = ContactModel;

--DONE-- 

fix joy validation