// Enable dotenv
require('dotenv').config();

import "core-js/stable";
import "regenerator-runtime/runtime";

import express from 'express'
import { ApolloServer, gql } from "apollo-server-express";
import mongoose from "mongoose";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { User } from './models/Users/User';

const app = express();
app.set('trust proxy', true)

const getUser = async (token) => {
    if (token == '') return null;

    // TODO: Fix this shit to actually use tokens
    return await User.getUserByToken(token);
}

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            const user = getUser(token);

            const ip = req.ip;

            return { ip, user };
        }
    });

    server.applyMiddleware({ app });

    let mongooseConnectionURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}${process.env.DB_OPTIONS}`

    await mongoose.connect(mongooseConnectionURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Database Connected")
    }).catch((err) => {
        console.error(err)
    });

    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    })
}

startServer();