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

    const sql = `INSERT INTO leads (leadName, leadAddress, leadPhone, leadMail) VALUES ('${data.leadAddress}', '${data.leadName}', '${data.leadPhone}', '${data.leadMail}')`;
    const leads = await dal.executeAsync(sql);
    return leads;
}


async function deleteOneLeadAsync(id) {
    const sql = `DELETE FROM leads WHERE leadID = ${id}`;
    const lead = await dal.executeAsync(sql);
    return lead;
}

async function updateFullLeadAsync(data) {
    const sql = `UPDATE leads SET leadName = '${data.leadName}', leadAddress = '${data.leadAddress}', leadPhone = '${data.leadPhone}', leadMail = '${data.leadMail}' WHERE leadID = ${data.leadID}`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : data;
}

async function updatePartialLeadAsync(lead) {

    let sql = "UPDATE leads SET ";

    if(lead.leadName) {
        sql += `leadName = '${lead.leadName}',`
    }
    if(lead.leadAddress) {
        sql += `leadAddress = '${lead.leadAddress}',`
    }
    if(lead.leadPhone) {
        sql += `UnitsInStock = '${lead.leadPhone}',`
    }

    // Delete last comma: 
    sql = sql.substr(0, sql.length - 1);

    sql += ` WHERE leadID = ${lead.leadID}`;

    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : lead;
}

module.exports = {
    getAllLeadsAsync, getOneLeadAsync, addOneLeadsAsync, deleteOneLeadAsync,
    updateFullLeadAsync, updatePartialLeadAsync
}