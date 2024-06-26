import express from "express";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs"
import cors from 'cors';
import dotenv from 'dotenv';
import characterRouter from "./src/routes/character"
import { corsOptions, limiter } from "./src/utils/utils"

// Cargar variables de entorno desde un archivo .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

app.use('/characters', characterRouter);

// 404 error handler
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
