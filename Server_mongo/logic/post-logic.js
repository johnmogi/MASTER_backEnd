const Post = require("../models/post");

function getAllPosts() {
  // return Post.find({}).exec();
  return Post.find({}).populate("categories").exec();
}

function getOnePost(id) {
  // return Post.find({}).populate("categories").exec();
  return Post.find({ _id: id }).exec();
}

function addOnePost(post) {
  return post.save();
}

function updatePost(post) {
  console.log(post._id);
  return new Promise((resolve, reject) => {
    Post.updateOne({ _id: post._id }, post, (err, info) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(info.n ? post : null);
    });
  });
}

module.exports = { getAllPosts, getOnePost, addOnePost, updatePost };
