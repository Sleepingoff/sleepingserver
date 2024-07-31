const Post = require("../models/Post");
//서비스의 액션들을 함수로 지정. 요청에 따라 데이터를 반환, 입력, 수정, 삭제 역할을 수행
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
