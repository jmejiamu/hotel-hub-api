import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CompanyCode } from "./CompanyCode";

@Entity("healer")
export class Healer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Generated("uuid")
  user_id: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => CompanyCode, (company) => company.healer)
  company: CompanyCode;
}
