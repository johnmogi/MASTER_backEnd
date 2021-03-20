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

module.exports = { getAllLeadsAsync, getOneLeadAsync }