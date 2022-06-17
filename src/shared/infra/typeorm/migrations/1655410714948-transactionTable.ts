import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class transactionTable1655410714948 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "value",
            type: "numeric",
          },
          {
            name: "payment_method",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "card_number",
            type: "varchar",
          },
          {
            name: "card_name",
            type: "varchar",
          },
          {
            name: "card_validate",
            type: "varchar",
          },
          {
            name: "card_cvv",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions");
  }
}
