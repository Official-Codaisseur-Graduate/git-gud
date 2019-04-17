import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn
} from "typeorm";

@Entity()
export class Score extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  profileScore: number;

  @Column({default: 0})
  gitScore: number;

  @Column({default: 0})
  totalScore: number

  @CreateDateColumn()
  createdAt: Date;


}
