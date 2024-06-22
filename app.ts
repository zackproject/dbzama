const express = require("express");
require('dotenv').config();

import "reflect-metadata";
import { MysqlDataSource } from "./src/data-source.";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs"

// Use mysql in this case
// https://orkhan.gitbook.io/typeorm/docs/data-source
export const AppDataSource = MysqlDataSource;

const app = express();
const port = process.env.PORT || 3000; // Use the PORT from environment variables if available

AppDataSource.initialize().then(() => {
  app.use(express.json());
  app.disable("x-powered-by")
  app.use(express.urlencoded({ extended: true }));


  // Configuración de Swagger UI en la ruta /docs
  app.get('/', (req, res) => res.redirect('/docs'));
  // Configura Swagger UI para leer el archivo OpenAPI YAML
  const swaggerDocument = YAML.load('./openapi.yaml');

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


  // Serve static files from the 'public' directory
  app.use(express.static(__dirname + "/public"));

  app.use('/characters', require('./src/routes/character.ts'));

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
