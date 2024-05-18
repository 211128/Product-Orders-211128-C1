import { Orders } from "./orders";

export interface IOrdersRepository {
  createOrder(
    total: number,
    date: Date,
    status: String,
  ): Promise<Orders | null>;

  listAllOrders(): Promise<Orders[] | null>;

  updateOrders(
    id: number,
    total?: number,
    date?: Date,
    status?: String,
): Promise<Orders | null>

}