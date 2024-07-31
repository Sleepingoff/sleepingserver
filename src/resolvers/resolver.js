const Post = require("../models/Post");

const resolvers = {
  posts: async () => await Post.find(),
  post: async ({ id }) => await Post.findById(id),
  createPost: async ({ title, content }) => {
    const newPost = new Post({
      title,
      content,
      version: 1,
      createdAt: new Date(),
    });
    return await newPost.save();
  },
  updatePost: async ({ id, content }) => {
    const post = await Post.findById(id);
    if (!post) throw new Error("Post not found");
    post.content = content;
    post.version += 1;
    post.updatedAt = new Date();
    return await post.save();
  },
};

module.exports = resolvers;
