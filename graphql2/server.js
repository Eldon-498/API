const express = require("express");
const {ApolloServer, gql} = require("apollo-server-express");

const typeDefs = gql`
type Query{
    hello: String
}


`
const resolver = {
    Query: {
    hello: () => {
       return 'hello world';
    }
}
}