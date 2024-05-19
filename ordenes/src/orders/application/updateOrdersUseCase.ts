import { Orders } from "../domain/orders";
import { IOrdersRepository } from "../domain/ordersRepository";


export class UpdateProductUseCase {
    constructor(readonly userRepository: IOrdersRepository) {}
    
    async run(
        id: number,
        status: string
        ): Promise<Orders | null> {
        console.log("updated")
        try {
            const updateUserById = await this.userRepository.updateOrders(id, status);
            return updateUserById;
        } catch (error) {
            return null;
        }
    }
}