export interface ICreateTransactionDTO {
  value: number;
  payment_method: string;
  description: string;
  card_number: string;
  card_name: string;
  card_validate: string;
  card_cvv: string;
}
