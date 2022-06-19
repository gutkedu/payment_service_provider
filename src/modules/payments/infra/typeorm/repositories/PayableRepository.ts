import { getRepository, Repository } from "typeorm";
import { ICreatePayableDTO } from "@modules/payments/dtos/ICreatePayableDTO";
import { IPayableRepository } from "@modules/payments/repositories/IPayableRepository";
import { Payable } from "../entities/Payable";

export class PayableRepository implements IPayableRepository {
  private repository: Repository<Payable>;

  constructor() {
    this.repository = getRepository(Payable);
  }

  async create({
    fee,
    payment_date,
    status,
  }: ICreatePayableDTO): Promise<Payable> {
    const payable = this.repository.create({ fee, payment_date, status });
    await this.repository.save(payable);
    return payable;
  }
  async listByStatus(status: string): Promise<Payable[]> {
    const payableQuery = await this.repository
      .createQueryBuilder("p")
      .where("status = :status", { status: status });
    const payables = await payableQuery.getMany();
    return payables;
  }
}
