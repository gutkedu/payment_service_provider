import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Transaction } from "./Transaction";

@Entity("payables")
export class Payable {
  @PrimaryColumn()
  id: string;

  @Column()
  status: string;

  @Column()
  payment_date: Date;

  @Column()
  fee: number;

  @Column()
  transaction_id: string;

  @OneToOne(() => Transaction)
  @JoinColumn({ name: "transaction_id" })
  transaction: Transaction;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
