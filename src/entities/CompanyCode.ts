import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Healer, FrontendDesk, Customer } from "../entities";

@Entity("company_code")
export class CompanyCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  company_name: string;

  @OneToMany(() => FrontendDesk, (frontendDesk) => frontendDesk.company)
  frontendDesk: FrontendDesk[];

  @OneToMany(() => Healer, (healer) => healer.company)
  healer: Healer[];

  @OneToMany(() => Customer, (customer) => customer.company)
  customer: Customer[];
}
