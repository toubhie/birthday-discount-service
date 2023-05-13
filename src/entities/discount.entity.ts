import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;
  
  @Column({
    nullable: false,
    default: '',
  })
  code: string;

  @Column({
    nullable: true,
    default: '',
  })
  description: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  dateCreated: Date;

  @Column({
    nullable: true,
    default: '',
  })
  dueDate: string;
}