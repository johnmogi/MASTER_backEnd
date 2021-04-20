0. models/Item -
mkdir models
cd models
1. touch Item.js -
const mongoose = require("mongoose");
const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});
ItemSchema.virtual("category", {
    ref: "Category",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});
const Item = mongoose.model("Item", ItemSchema, "items");
module.exports = Item; 
2. Category.js - 
const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});
CategorySchema.virtual("items", {
    ref: "Item",
    localField: "_id",
    foreignField: "categoryId"
});
const Category = mongoose.model("Category", CategorySchema, "categories");
module.exports = Category;

0. logic / item-logic.js
const Item = require('../models/item');
function getAllItems() {
    return Item.find({}).populate("categories").exec();
}
module.exports = {
    getAllItems
}

0.  controller - item-controller.js -
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

0. dal -
const mongoose = require("mongoose");
function connectAsync() {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost:27017/OnlineStore",
            { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(db);
            });
    });
}
async function connectToDatabase() {
    try {
        const db = await connectAsync();
        console.log("We're connected to " + db.name + " database on MongoDB");
    }
    catch (err) {
        console.error(err);
    }
}
connectToDatabase();

0. app - 
require("./dal");
const express = require('express');
const cors = require("cors");
const itemsController = require('./controller/item-controller');
const server = express();
server.use(cors());
server.use(express.json());
server.use('/api/items', itemsController);
server.listen(3000, () => console.log("Listening on http://localhost:3000"));

0. build db -
