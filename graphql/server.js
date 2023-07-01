const express = require('express');
const {buildSchema} = require('graphql');
const {graphqlHTTP} = require('express-graphql');

const app = express();

const schema = buildSchema(`
type Post {
    postId: Int
    it: Int
    name: String
    body: String

}

type User {
    name: String
    age: Int
    college: String
}

type Query {
    hello: String
    welcomeMessage(name: String!): String
    getUser: User
    getUsers: [User]
    getPosts: [Post]

}
`)

const root = {
    hello: () => {
        return 'hello world';
    },
    welcomeMessage: (args) => {
        console.log(args);
        return `Hey ${args.name}, how\'s life`;
    },
    getUser: () => {
        const user = {
            name: 'Eldon',
            age: 25,
            college: 'SPU'
        }
        return user;
    },
    getUsers: () => {
        const users = [{
            name: 'Eldon',
            age: 25,
            college: 'SPU'
        },
        {
            name: 'Dan',
            age: 25,
            college: 'USIU'
        },
        {
            name: 'Christ',
            age: 33,
            college: 'Jerusalem'
        }]
        return users;
        
    },
    getPosts: () => {

    }
};

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root

}))

app.listen(4000, () => console.log("Server on port 4000"));