
import * as param from "../middlewares/parametres/character.param";
import { Router, Request, Response } from "express";

const characterRouter = Router()
characterRouter.use((req: Request, res: Response, next) => {
    if (req.method !== "GET") {
        return res.status(401).json({ message: `401: Unauthorized, Only GET is  avaliable` });
    }
    next();
});

// router.get("/fill", param.fillDefaultHandler)

// GET /characters
characterRouter.get('/', param.getCharactersHandler);

// GET /characters/Haikyuu
characterRouter.get('/series/:serie', param.getCharactersBySerieHandler);

// GET /characters/series
characterRouter.get('/series', param.getAllSeriesHandler);

// GET /characters/1
characterRouter.get('/:id', param.getCharacterByIdHandler);

// POST /characters
characterRouter.post("/", param.postCharacterHandler);

// PUT /characters/1
characterRouter.put("/:id", param.modifyCharacterHandler);

// DELETE /characters/1
characterRouter.delete("/:id", param.deleteCharacterHandler);


export default characterRouter
