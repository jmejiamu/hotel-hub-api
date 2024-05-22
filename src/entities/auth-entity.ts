import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Calendar } from "./Calendar";

@Entity("register")
export class Register extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  user_id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  userType: string;

  @OneToMany(() => Signin, (signin) => signin.signin)
  register: Register;

  @OneToOne(() => Calendar, (calendar) => calendar.register)
  calendar: Calendar;
}

@Entity("signin")
export class Signin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  user_id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  userType: string;

  @OneToMany(() => Register, (reg) => reg.register)
  signin: Signin;
}
