import { Orders } from "./orders";

export interface IOrdersRepository {
  createOrder(
    total: number,
    status: String,
  ): Promise<Orders | null>;

  listAllOrders(): Promise<Orders[] | null>;

  updateOrders(
    id: number,
    status?: string,
): Promise<Orders | null>

}