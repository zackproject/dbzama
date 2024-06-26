
import { CharacterControler } from "./../controler/character"
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
characterRouter.get('/', CharacterControler.getAll);

// GET /characters/Haikyuu
characterRouter.get('/series/:serie', CharacterControler.getBySerie);

// GET /characters/series
characterRouter.get('/series', CharacterControler.getAllSeries);

// GET /characters/1
characterRouter.get('/:id', CharacterControler.getById);

// POST /characters
characterRouter.post("/", CharacterControler.post);

// PUT /characters/1
characterRouter.put("/:id", CharacterControler.modify);

// DELETE /characters/1
characterRouter.delete("/:id", CharacterControler.delete);


export default characterRouter
