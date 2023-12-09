import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import { graphqlHTTP } from "express-graphql";

// import utiles
import "./utils/index";
// imported routes
import schema from "./schema/Sheama";

// import middlwares
// import { notFound, errorHandler } from "./middlewares/errorMiddleware";

// env
dotenv.config();

// database
connectDB();

// define express
const app = express();

// use cors
app.use(cors());

// use routes
app.use(
    "/",
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === "development"
    })
);

// // use error Middlewares
// app.use(notFound);
// app.use(errorHandler);

export default app;
