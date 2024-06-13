import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CompanyCode } from "./CompanyCode";

@Entity("customer_calendar")
export class CustomerCalendar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  event_id: string;

  @Column()
  @Generated("uuid")
  user_id: string;

  @Column()
  @Generated("uuid")
  customer_id: string;

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

  @ManyToOne(() => CompanyCode, (company) => company.customerCalendar)
  company: CompanyCode;
}
