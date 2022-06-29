import { 
  Entity, 
  Column, 
  BaseEntity,
  PrimaryGeneratedColumn 
} from "typeorm";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "username" })
  username: string;
}
