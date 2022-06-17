import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { IsNumber, IsString } from "class-validator";

@Entity("transactions")
export class Transaction {
  @PrimaryColumn()
  id: string;

  @Column()
  @IsNumber()
  value: number;

  @Column()
  @IsString()
  payment_method: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  card_number: string;

  @Column()
  @IsString()
  card_name: string;

  @Column()
  @IsString()
  card_validate: string;

  @Column()
  @IsString()
  card_cvv: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
