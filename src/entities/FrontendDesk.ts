import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CompanyCode } from "./CompanyCode";

@Entity("frontend_desk")
export class FrontendDesk extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Generated("uuid")
  user_id: string;

  @Column()
  username: string;

  @ManyToOne(() => CompanyCode, (company) => company.frontendDesk)
  company: CompanyCode;
}
