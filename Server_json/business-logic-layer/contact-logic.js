const fs = require("fs");

const fileName = "./data-access-layer/formData.json";

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