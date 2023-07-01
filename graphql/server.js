const express = require('express');
const {buildSchema} = require('graphql');
const {graphqlHTTP} = require('express-graphql');
const axios = require('axios')

const app = express();

let message = 'This is a message';

const schema = buildSchema(`
type Comment {
    postId: Int
    it: Int
    name: String
    email: String
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
    getComments: [Comment]

}

input UserInput {
    name: String!
    age: Int!
    college: String!
}

type Mutation {
 setMessage(newMessage: String): String
 createUser(input: UserInput): User
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
    getComments: async () => {
       const result = await axios.get('https://jsonplaceholder.typicode.com/comments');
       return result.data;
    },
    setMessage: ({ newMessage }) => {
        message = newMessage;
        return message;
    },
    createUser: (args) => {
            return args.input
    }
};

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root

}))

app.listen(4000, () => console.log("Server on port 4000"));