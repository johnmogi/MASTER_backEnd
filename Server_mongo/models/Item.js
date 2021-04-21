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


const Item = mongoose.model("Item", ItemSchema, "items");

module.exports = Item; 