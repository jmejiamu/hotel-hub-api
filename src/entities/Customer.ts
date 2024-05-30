import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CompanyCode } from "./CompanyCode";

@Entity("customer")
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Generated("uuid")
  user_id: string;

  @Column()
  email: string;

  @ManyToOne(() => CompanyCode, (company) => company.customer)
  company: CompanyCode;
}
