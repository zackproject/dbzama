import { MigrationInterface, QueryRunner, Table } from "typeorm";

// https://www.tutorialspoint.com/typeorm/typeorm_migrations.htm
export class CreateCharacter1718798622821 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "character",
            columns: [
                {
                    isPrimary: true,
                    name: 'id',
                    type: 'uuid',
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "image",
                    type: "varchar",
                },
                {
                    name: "serie",
                    type: "varchar",
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("character");
    }

}
