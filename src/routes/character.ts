
import * as param from "../middlewares/parametres/character.param";
import { Router, Request, Response } from "express";

const router = Router();

router.use((req: Request, res: Response, next) => {
    if (req.method !== "GET") {
        return res.status(401).json({ message: `401 Unauthorized` });
    }
    next();
});

// GET /characters
router.get('/', param.getCharactersHandler);

// GET /characters/Haikyuu
router.get('/series/:serie', param.getCharactersBySerieHandler);

// GET /characters/series
router.get('/series', param.getAllSeriesHandler);

// GET /characters/1
router.get('/:id', param.getCharacterByIdHandler);

// POST /characters
router.post("/", param.postCharacterHandler);

// PUT /characters/1
router.put("/:id", param.modifyCharacterHandler);

// DELETE /characters/1
router.delete("/:id", param.deleteCharacterHandler)

module.exports = router;