import { Exclude } from 'class-transformer';
import {
  Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  phoneNumber: string;

  @Column({
    nullable: true,
    default: '',
  })
  dob: string;

  @Exclude()
  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    nullable: true,
    default: '',
  })
  birthdayDiscountCode: string;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  dateCreated: Date | null;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  dateUpdated: Date | null;

  @Column({ 
    type: 'timestamp', 
    nullable: true, 
    default: null 
  })
  lastLoginAt: Date | null;

  @Column({
    nullable: true,
    default: '',
  })
  token: string;

  @Column({
    nullable: true
  })
  favoriteCategory: number;

}