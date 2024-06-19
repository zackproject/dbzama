import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseAbstractEntity } from './base-abstract.entity';

@Entity()
export class Character extends BaseAbstractEntity{
  @Column()
  name!: string;

  @Column()
  image!: string;

  @Column()
  serie!: string;
}
