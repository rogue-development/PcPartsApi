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
import "colors"
import { sendVerificationMail, setupSendgrid } from "./mailer";
import { cleanTokens } from "./TokenGenerator";

const getUser = async (token) => {
    if (token == '') return null;
    if (!token.includes("Bearer ")) return null;
    return await User.getUserByToken(token);
}

const startGraphQLServer = async () => {
    const app = express();
    app.set('trust proxy', true)

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

    server.applyMiddleware({ app, path: "/" });

    let mongooseConnectionURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}${process.env.DB_OPTIONS}`
    await mongoose.connect(mongooseConnectionURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Database Connected".green)
    }).catch((err) => {
        console.error(err.red)
    });

    setupSendgrid();

    app.listen({ port: 4000 }, () => {
        console.log(`GraphQL Server ready at`.yellow + ` http://localhost:4000${server.graphqlPath}`.blue.bold);
    })
}

const startRESTServer = async () => {
    setInterval(cleanTokens, 1000 * 60 * 60);
    const app = express();
    app.set('trust proxy', true);

    app.get("/verify", async (req, res) => {
        if (req.query.token == undefined) { res.send("Token is required"); return; }
        res.send(await User.verifyToken(req.query.token));
    });
    app.get("/verify/resend", async (req, res) => {
        if (req.query.token == undefined) { res.send("Token is required"); return; }
        res.send(await User.resendVerificationToken(req.query.token));
    })

    app.listen({ port: 4001 }, () => {
        console.log("REST server ready at".yellow + ` http://localhost:4001`.blue.bold);
    })
}

startGraphQLServer();
startRESTServer();
