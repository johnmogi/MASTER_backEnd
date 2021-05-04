const mongoose = require("mongoose");
const PostSchema = mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 30 },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { versionKey: false, toJSON: { virtuals: true }, id: false }
);
PostSchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});
const Post = mongoose.model("Post", PostSchema, "posts");
module.exports = Post;
