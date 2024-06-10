const express = require("express");
require('dotenv').config();

import "reflect-metadata";
// import { Request, Response } from "express";
import AppDataSource from "./src/ormconfig";


const app = express();
const port = process.env.PORT || 3000; // Use the PORT from environment variables if available

AppDataSource.initialize().then(() => {
  app.use(express.json());


  app.use(express.urlencoded({ extended: true }));

  // Serve static files from the 'public' directory
  app.use(express.static(__dirname + "/public"));

  app.use('/character', require('./src/routes/character.ts'));

  // 404 error handler
  app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/404.html");
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

}).catch(error => {
  console.error('Database connection error:', error);
});
