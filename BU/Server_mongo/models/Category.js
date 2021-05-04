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

CategorySchema.virtual("item", {
    ref: "Item",
    localField: "itemId",
    foreignField: "_id",
    justOne: true
});

const Category = mongoose.model("Category", CategorySchema, "categories");

module.exports = Category;