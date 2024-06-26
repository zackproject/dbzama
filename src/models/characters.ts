import AppDataSource from "./../data-source"
import { Character } from "./../entities/character.entity"

// https://orkhan.gitbook.io/typeorm/docs/example-with-express
const characterRepository = AppDataSource.getRepository(Character)

// MVC : Model
export class CharacterModel {
    // if not static, will need instance (new CharacterModel )
    static async delete(id: string) {
        const result = await characterRepository.delete(id);
        // if true: deleted, if false: not found
        return result.affected === 1;
    }
    static async modify(nCharacter: Character, { name, image, serie }) {
        const result = characterRepository.merge(nCharacter, { name, image, serie });
        await characterRepository.save(result);
        return result;
    }
    static async post({ name, image, serie }) {
        const nCharacter = characterRepository.create({ name, image, serie });
        return await characterRepository.save(nCharacter);
    }
    static async getAllSeries() {
        const characterSerie = await characterRepository.createQueryBuilder('character')
            .select('DISTINCT character.serie', 'serie')
            .getRawMany();
        const uniqueSeries = characterSerie.map(item => item.serie);
        return uniqueSeries;
    }
    static async getBySerie(serie: string) {
        return await characterRepository.findBy({ serie: serie, });
    }
    static async getById(id: string) {
        return await characterRepository.findOneBy({ id: id });
    }
    static async getAll() {
        return await characterRepository.find();
    }


}