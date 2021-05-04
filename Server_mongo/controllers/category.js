const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const catLogic = require("../logic/category-logic");

router.get("/", async (request, response) => {
  try {
    const cats = await catLogic.getAllICategories();
    response.json(cats);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/posts/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const cats = await catLogic.getAllIPostsFromCategory(id);
    response.json(cats);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
