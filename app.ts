import express from "express";
import "reflect-metadata";
import { SqlDataSource } from "./src/data-source";
import rateLimit from 'express-rate-limit';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs"
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno desde un archivo .env
dotenv.config();
// https://orkhan.gitbook.io/typeorm/docs/data-source
export const AppDataSource = SqlDataSource;

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  // ERROR CORS https://youtu.be/-9d3KhCqOtU?feature=shared&t=4752
  origin: process.env.ORIGIN.split(" "),
  optionsSuccessStatus: 200,
};

// https://youtu.be/9jK-NcRmVcw?si=cD5RYnpfbjaI-wA0
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // minutes 
  max: parseInt(process.env.LIMIT_REQUEST), // max request by minutes
  message: 'To many request, try after 5 minutes',
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

// limits request server: 
app.use(limiter);
// allow json request
app.use(express.json());
// Disable to hide in headers what tecnology im using
app.disable("x-powered-by")
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// DEFAULT URL Swagger /docs CRUD
app.get('/', (req, res) => res.redirect('/docs'));
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
