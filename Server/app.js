const express = require("express");
const cors = require("cors");
// const contactsController = require("./controller/contacts-controller");

const server = express();
server.use(cors()); 
server.use(express.json());
// server.use("/api/contacts", contactsController);

server.listen(3000, () => console.log("Listening on http://localhost:3000"));