import { getConnection } from "typeorm";
import { Character } from '../entity/Character';
import { Router, Request, Response } from "express";


const router = Router();

import { createClient } from "@libsql/client";

export const turso = createClient({
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

// Get all characters
router.get('/', async (req: Request, res: Response) => {
    try {
        const connection = getConnection();
        const characterRepository = connection.getRepository(Character);
        const characters = await characterRepository.find();
        res.json(characters);
    } catch (error) {
        console.error("Database query error:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;