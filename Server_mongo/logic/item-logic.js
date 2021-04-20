const Item = require('../models/item');

function getAllItems() {
    return Item.find({}).populate("categories").exec();
}

module.exports = {
    getAllItems
}