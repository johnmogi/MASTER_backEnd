const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const itemsLogic = require('../logic/item-logic');

router.get('/', async (request, response) => {
    try {
        const items = await itemsLogic.getAllItems();
        response.json(items);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;