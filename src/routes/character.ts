import { AppDataSource } from '../../app';
import { Character } from '../entities/character.entity';
import { Router, Request, Response } from "express";

const router = Router();

// https://orkhan.gitbook.io/typeorm/docs/example-with-express
const characterRepository = AppDataSource.getRepository(Character)

// http://localhost:3000/character/
router.get('/', async (req: Request, res: Response) => {
    const allCharacters = await characterRepository.find();
    res.json(allCharacters)
});

router.get('/serie/:serie', async (req: Request, res: Response) => {
    const { serie } = req.params;
    const characterSerie = await characterRepository.findBy({
        serie: serie,
    })
    res.json(characterSerie)
});

// http://localhost:3000/character/series
router.get('/series', async (req: Request, res: Response) => {
    const characterSerie = await characterRepository.createQueryBuilder('character')
        .select('DISTINCT character.serie', 'serie')
        .getRawMany();
    const uniqueSeries = characterSerie.map(item => item.serie);
    res.json(uniqueSeries)
});

// http://localhost:3000/character/1
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const characterId = await characterRepository.findOneBy({
        id: id,
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
        id: req.params.id,
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