const {gql} = require("apollo-server-express");

const resolvers = {
    Query: {
    hello: () => {
       return 'hello world';
    }
}
}
module.exports = resolvers;