import { Orders } from "../domain/orders";
import { IOrdersRepository } from "../domain/ordersRepository";

export class RegisterUseCase {
  constructor(readonly orderRepository: IOrdersRepository) {}

  async run(
    total: number,
    date: Date,
    status: string,
  ): Promise<Orders | null> {
    try {
      const createNewUser = await this.orderRepository.createOrder(
        total,
        date,
        status,

      );


      return createNewUser;
    } catch (error) {
      console.error("Error al registrar la orden:", error);
      return null; 
    }
  }
}
