import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("transactions")
export class Transaction {
  @PrimaryColumn()
  id: string;

  @Column()
  value: number;

  @Column()
  payment_method: string;

  @Column()
  description: string;

  @Column()
  card_number: string;

  @Column()
  card_name: string;

  @Column()
  card_validate: Date;

  @Column()
  card_cvv: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
