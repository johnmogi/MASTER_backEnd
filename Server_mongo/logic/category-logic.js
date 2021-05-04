const Category = require("../models/category");

function getAllICategories() {
  return Category.find({}).populate("categories").exec();
}

function getAllIPostsFromCategory(_id) {
  return Category.find({ _id }).populate("posts").exec();
}

module.exports = { getAllICategories, getAllIPostsFromCategory };
