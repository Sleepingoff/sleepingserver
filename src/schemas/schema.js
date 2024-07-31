const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Post{
        id: ID!
        title: String!
        content: String!
        version: Init!
        updatedAt: String!
        createdAt: String!
    }
    type Query{
        posts: [Post]
        post(id: ID!) : Post
    }

    type Mutation{
        createdPost(title:String!, content: String!) : Post
        updatePost(id: ID!, content: String!) : Post
    }
    `);
