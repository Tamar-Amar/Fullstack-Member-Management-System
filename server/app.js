
import express from "express";
import myMongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import membersControl from "./controllers/membersController.js";

import logger from './logger.js';
//let logger = require('../logger.js');



dotenv.config();

const app = express();

let PORT ;
try{
    PORT = process.env.PORT;
} catch{
    PORT =3000;
}

myMongoose
  .connect("mongodb://127.0.0.1:27017/corona-management-system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to database");
    console.log("Connected to database");
  })
  .catch((err) => {
    logger.error("Error connecting to database:", err);
    console.error("Error connecting to database:", err);
  });

const db = myMongoose.connection;

db.on("open", () => {
  logger.info("Database connection established");
  console.log("db is open");
});

app.use(cors());

app.use(express.static("public"));

app.use("/api/members", membersControl);

app.listen(PORT, () => {
  logger.info(`Server started successfully on port ${PORT}`);
  console.log("connected successfully in port " +PORT);
});



