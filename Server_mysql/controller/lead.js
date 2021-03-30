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
// GET http://localhost:3000/api/lead/:id 
router.get("/lead/:id", async (request, response) => {
    const id = request.params.id
    try {
        const lead = await leadLogic.getOneLeadAsync(id);
        response.json(lead);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// POST http://localhost:3000/api/leads 
router.post("/leads", async (request, response) => {
    const data = request.body
    try {
        const leads = await leadLogic.addOneLeadsAsync(data);
        response.json(leads);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE http://localhost:3000/api/lead/:id 
router.delete("/lead/:id", async (request, response) => {
    const id = +request.params.id
    try {
        const lead = await leadLogic.deleteOneLeadAsync(id);
        response.sendStatus(204);

    } catch (err) {
        response.status(500).send(err.message);
    }
});

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
module.exports = router;