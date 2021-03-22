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

async function putOneLeadsAsync(data) {
    console.log(`data`, data)
    // const sql = `UPDATE leads SET leadID = ${data.id}, leadName='${data.leadName}', leadAddress='${data.leadAddress}', leadPhone='${data.leadPhone}', leadMail='${data.leadMail}' WHERE 1`
    const sql = `UPDATE leads SET leadName='${data.leadName}' WHERE leadID = ${data.id}`
    const leads = await dal.executeAsync(sql);
    return leads;
}

module.exports = {
    getAllLeadsAsync, getOneLeadAsync, addOneLeadsAsync, deleteOneLeadAsync,
    putOneLeadsAsync
}