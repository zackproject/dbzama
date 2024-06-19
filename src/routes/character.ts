import { AppDataSource } from '../../app';
import { Character } from '../entity/Character';
import { Router, Request, Response } from "express";


const router = Router();

// https://orkhan.gitbook.io/typeorm/docs/example-with-express
const characterRepository = AppDataSource.getRepository(Character)

// http://localhost:3000/character/
router.get('/', async (req: Request, res: Response) => {
    const allCharacters = await characterRepository.find();
    res.json(allCharacters)
});

// http://localhost:3000/character/1
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const characterId = await characterRepository.findOneBy({
        id: parseInt(id),
    })

    if (!characterId) {
        return res.status(404).json({ message: `Character ${id} not found` });
    }
    res.json(characterId)
});

// http://localhost:3000/character/add
router.post("/add", async function (req: Request, res: Response) {
    const nCharacter = await characterRepository.create(req.body)
    const results = await characterRepository.save(nCharacter)
    return res.send(results)
});

// http://localhost:3000/character/modify/1
router.put("/modify/:id", async function (req: Request, res: Response) {
    const nCharacter = await characterRepository.findOneBy({
        id: parseInt(req.params.id),
    })
    AppDataSource.getRepository(Character).merge(nCharacter, req.body)
    const results = await characterRepository.save(nCharacter)
    return res.send(results)
});

// http://localhost:3000/character/delete/1
router.delete("/delete/:id", async function (req: Request, res: Response) {
    const results = await characterRepository.delete(req.params.id)
    return res.send(results)
})

module.exports = router;