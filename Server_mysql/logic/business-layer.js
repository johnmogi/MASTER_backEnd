const dal = require("../data/access-layer");
async function getAllLeadsAsync() {
    const sql = "SELECT * FROM leads";
    const leads = await dal.executeAsync(sql);
    return leads;
}
async function getOneLeadAsync(id) {
    const sql = `SELECT * FROM leads WHERE leadID = ${id}`;
    const leads = await dal.executeAsync(sql);
    return leads;
}
async function addOneLeadsAsync(data) {
console.log(`data`, data)
    const sql = `INSERT INTO leads (leadName, leadAddress, leadPhone, leadMail) VALUES ('${data.leadAddress}', '${data.leadName}', '${data.leadPhone}', '${data.leadMail}')`;
    const leads = await dal.executeAsync(sql);
    return leads;
}



async function deleteOneLeadAsync(id) {
    const sql = `DELETE FROM leads WHERE leadID = ${id}`;
    const lead = await dal.executeAsync(sql);
    return lead;
}

module.exports = { getAllLeadsAsync, getOneLeadAsync, addOneLeadsAsync, deleteOneLeadAsync  }