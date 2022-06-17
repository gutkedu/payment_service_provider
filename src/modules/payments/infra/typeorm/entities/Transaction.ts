import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import {
  IsNumber,
  IsPositive,
  IsString,
  Length,
  IsIn,
  IsAlpha,
} from "class-validator";

@Entity("transactions")
export class Transaction {
  @PrimaryColumn()
  id: string;

  @Column()
  @IsNumber()
  @IsPositive()
  value: number;

  @Column()
  @IsString()
  @IsIn(["debit_card", "credit_card"])
  payment_method: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  @Length(13, 16)
  card_number: string;

  @Column()
  @IsString()
  @IsAlpha()
  card_name: string;

  @Column()
  @IsString()
  card_validate: string;

  @Column()
  @IsString()
  @Length(3, 3)
  card_cvv: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
