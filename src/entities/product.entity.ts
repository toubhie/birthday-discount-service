import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;
  
  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: true,
    default: '',
  })
  description: string;

  @Column({
    nullable: true
  })
  category: number;

}