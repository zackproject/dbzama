import { DataSource } from "typeorm";
import { Character } from "./entities/character.entity";
import { config } from "dotenv";
import { CreateCharacter1718798622821 } from "./migrations/create/1718798622821-CreateCharacter";

config(); // Load environment variables

type DBLANG = "postgres" | "mysql" | "sqlite";

// https://orkhan.gitbook.io/typeorm/docs/data-source
export const SqlDataSource = new DataSource({
  type: process.env.DB_TYPE as DBLANG,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // Sincronizar las entidades automáticamente
  logging: true, // Habilitar el registro de consultas
  entities: [Character], // Tus entidades
  subscribers: [], // Suscriptores (vacío si no tienes)
  migrations: [CreateCharacter1718798622821], // Migraciones (vacío si no tienes)
});