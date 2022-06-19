import { ICreatePayableDTO } from "../dtos/ICreatePayableDTO";
import { Payable } from "../infra/typeorm/entities/Payable";

export interface IPayableRepository {
  create(data: ICreatePayableDTO): Promise<Payable>;
  listByStatus(status: string): Promise<Payable[]>;
}
