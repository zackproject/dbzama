import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
export abstract class BaseAbstractEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;
  }
  