import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Register } from "./auth-entity";
import { CompanyCode } from "./CompanyCode";

@Entity("calendar")
export class Calendar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  event_id: string;

  @Column()
  event_title: string;

  @Column()
  event_description: string;

  @Column()
  event_start: Date;

  @Column()
  event_end: Date;

  @Column()
  userType: string;

  @ManyToOne(() => CompanyCode, (company) => company.calendar)
  company: CompanyCode;

  @ManyToMany(() => Register, (register) => register.calendar)
  register: Register;
}
