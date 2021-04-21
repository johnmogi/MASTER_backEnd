const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const itemsLogic = require('../logic/item-logic');

// GET http://localhost:3000/api/items
router.get('/', async (request, response) => {
    try {
        const items = await itemsLogic.getAllItems();
        response.json(items);
    } catch (error) {
        response.status(500).send(error);
    }
});

// GET http://localhost:3000/api/items/item/:_id
router.get('/item/:_id', async (request, response) => {
    const _id = request.params._id
    try {
        const item = await itemsLogic.getOneItem(_id);
        response.json(item);
    } catch (error) {
        response.status(500).send(error);
    }
});

// POST http://localhost:3000/api/items/
router.post('/', async (request, response) => {
    const newItem = new Item(request.body);
    try {
        const item = await itemsLogic.addItem(newItem);
        response.json(item);
    } catch (error) {
        response.status(500).send(error);
    }
});

// PUT http://localhost:3000/api/items/item/:_id
router.put('/item/:_id', async (request, response) => {
    const _id = request.params._id
    const itemUpdate = new Item(request.body, _id);
    try {
        const item = await itemsLogic.updateItem(itemUpdate);
        response.json(item);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;