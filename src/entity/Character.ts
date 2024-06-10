import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @Column()
  serie!: string;
}
