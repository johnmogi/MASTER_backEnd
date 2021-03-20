const express = require("express");
const cors = require("cors");
const leadController = require("./controller/lead");
const server = express();
server.use(cors()); 
server.use(express.json()); 
server.use("/api", leadController); 
server.listen(3000, () => console.log("Listening on http://localhost:3000"));