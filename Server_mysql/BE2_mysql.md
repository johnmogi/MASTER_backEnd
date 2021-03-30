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
[leadSources table] // REMEMBER- connect PK TO FK by ID (!)
leadID FK
leadDate
site
facebook
manual

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

0.  put > business layer:
async function updateFullLeadAsync(data) {
    const sql = `UPDATE leads SET leadName = '${data.leadName}', leadAddress = '${data.leadAddress}', leadPhone = '${data.leadPhone}', leadMail = '${data.leadMail}' WHERE leadID = ${data.leadID}`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : data;
}

0. put > controller :
// PUT http://localhost:3000/api/lead/:id  
router.put("/lead/:id", async (request, response) => {
    try {
    const id = +request.params.id
    const data = request.body
    data.leadID = id;
    const updatedLead = await leadLogic.updateFullLeadAsync(data);
    if(updatedLead === null) {
        response.sendStatus(404);
        return;
    }
        response.json(updatedLead);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

0. patch > business layer:
async function updateFullLeadAsync(data) {
    const sql = `UPDATE leads SET leadName = '${data.leadName}', leadAddress = '${data.leadAddress}', leadPhone = '${data.leadPhone}', leadMail = '${data.leadMail}' WHERE leadID = ${data.leadID}`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : data;
}

0. patch > controller :
// PATCH http://localhost:3000/api/lead/:id  
router.patch("/lead/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const lead = request.body;
        lead.leadID = id;
        const updatedLead = await leadLogic.updatePartialLeadAsync(lead);
        
        if(updatedLead === null) {
            response.sendStatus(404);
            return;
        }
        
        response.json(updatedLead);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

0. DONE (:) // maybe missing some time handeling data but 100%