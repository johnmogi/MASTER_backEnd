0. npm init -y
0. npm i cors joi express mysql
0. create db mysql try to connect data tables.
((db contacts))
[table leads]
leadID PK AI
leadName
leadAddress
leadPhone
leadMail
<!-- [leadSources table] // designer relationship: missing index on columns?
leadName FK
leadDate
site
facebook
manual -->

0. data/access-layer.js : 
const mysql = require("mysql");
const connection = mysql.createConnection(
    { host: "localhost", 
    user: "root", 
    password: "", 
    database: "contacts" });
connection.connect(err => {
    if (err) { console.error(err); return; }
    console.log("We're connected to leads on MySQL.");
});
function executeAsync(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) { reject(err); return; }
            resolve(result);
        });
    });
}
module.exports = { executeAsync };

0. logic/business-layer: 
const dal = require("../data/access-layer");
async function getAllLeadsAsync() {
    const sql = "SELECT * FROM leads";
    const leads = await dal.executeAsync(sql);
    return leads;
}
module.exports = { getAllLeadsAsync }

0. controller/lead :
const express = require("express");
const leadLogic = require("../logic/business-layer");
const router = express.Router();
// GET http://localhost:3000/api/leads 
router.get("/leads", async (request, response) => {
    try {
        const leads = await leadLogic.getAllLeadsAsync();
        response.json(leads);
    } catch (err) {
        response.status(500).send(err.message);
    }
});
module.exports = router;

0. app.js : 
const express = require("express");
const cors = require("cors");
const leadController = require("./controller/lead");
const server = express();
server.use(cors()); 
server.use(express.json()); 
server.use("/api", leadController); 
server.listen(3000, () => console.log("Listening on http://localhost:3000"));






0. assistance extended - PUT > PATCH :
https://rapidapi.com/blog/put-vs-patch/
put overwrites, patch modifies chosen records.

0. 