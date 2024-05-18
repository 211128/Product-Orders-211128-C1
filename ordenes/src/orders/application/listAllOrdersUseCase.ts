import { Orders } from "../domain/orders";
import { IOrdersRepository as IOrdersRepository } from "../domain/ordersRepository";

export class ListAllOrdersUseCase {
  constructor(private readonly orderRepository: IOrdersRepository) {}

  
  async run(): Promise<Orders[] | null> {
    console.log("listando")
    try {
      const listAllActiveUser = await this.orderRepository.listAllOrders();
      if (listAllActiveUser) {
        return listAllActiveUser;
      } else {
        throw new Error("No se encontraron ordenes.");
      }
    } catch (err: any) {
      // Lanza una excepción con un mensaje de error específico.
      throw new Error("Error al obtener la lista de usuarios: " + err.message);
    }
  }
}
