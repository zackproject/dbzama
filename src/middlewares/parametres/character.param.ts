
import { AppDataSource } from "../../../app";
import { Character } from "../../entities/character.entity";
import { Request, Response } from "express";

// https://orkhan.gitbook.io/typeorm/docs/example-with-express
const characterRepository = AppDataSource.getRepository(Character)

export const getCharactersHandler = async (req: Request, res: Response) => {
    const allCharacters = await characterRepository.find();
    res.json(allCharacters);
};

export const getCharacterByIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const characterId = await characterRepository.findOneBy({
        id: id,
    });

    if (!characterId) {
        return res.status(404).json({ message: `Character ${id} not found` });
    }
    res.json(characterId);
};

export const getCharactersBySerieHandler = async (req: Request, res: Response) => {
    const { serie } = req.params;
    const characterSerie = await characterRepository.findBy({
        serie: serie,
    });
    res.json(characterSerie);
};

export const getAllSeriesHandler = async (req: Request, res: Response) => {
    const characterSerie = await characterRepository.createQueryBuilder('character')
        .select('DISTINCT character.serie', 'serie')
        .getRawMany();
    const uniqueSeries = characterSerie.map(item => item.serie);
    res.json(uniqueSeries);
};

export const postCharacterHandler = async (req: Request, res: Response) => {
    const { name, image, serie } = req.body;
    if (!name || !image || !serie) {
        return res.status(400).json({ message: `400 Bad Request : Invalid argument` });
    }
    const nCharacter = await characterRepository.create(req.body);
    const results = await characterRepository.save(nCharacter);
    return res.status(201).send(results);
};

export const modifyCharacterHandler = async (req: Request, res: Response) => {
    const { name, image, serie } = req.body;
    const { id } = req.params;
    if (!name || !image || !serie) {
        return res.status(400).json({ message: `400 Bad Request : Invalid argument` });
    }
    const nCharacter = await characterRepository.findOneBy({
        id: id,
    });
    if (!nCharacter) {
        return res.status(404).json({ message: `Character ${id} not found` });
    }
    AppDataSource.getRepository(Character).merge(nCharacter, req.body);
    const results = await characterRepository.save(nCharacter);
    return res.send(results);
};

export const deleteCharacterHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const results = await characterRepository.delete(id);
    if (results.affected == 1) {
        return res.status(200).json({ message: `Character '${id}' deleted succesfully` });
    }
    return res.status(404).json({ message: `Character '${id}' not found` });
};