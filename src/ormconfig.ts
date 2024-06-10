import { DataSource } from "typeorm";
import { Character } from "./entity/Character";
import { config } from "dotenv";

config(); // Load environment variables


// Verificar si process.env.TURSO_DATABASE_URL está definido
if (!process.env.TURSO_DATABASE_URL) {
  throw new Error("TURSO_DATABASE_URL is not defined in the environment variables.");
}

const AppDataSource = new DataSource({
  type: "sqlite",
  flags: 0x00000040, // this is required to make it work in TypeORM,
  database: process.env.TURSO_DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [Character],
  extra: {
    authToken: process.env.TURSO_AUTH_TOKEN
  }
});

export default AppDataSource;