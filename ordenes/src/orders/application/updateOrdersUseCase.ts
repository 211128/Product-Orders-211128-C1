import { Orders } from "../domain/orders";
import { IOrdersRepository } from "../domain/ordersRepository";


export class UpdateProductUseCase {
    constructor(readonly userRepository: IOrdersRepository) {}
    
    async run(
        id: number,
        total?: number,
        date?: Date,
        status?: string
        ): Promise<Orders | null> {
        console.log("updated")
        try {
            const updateUserById = await this.userRepository.updateOrders(id,total,date, status);
            return updateUserById;
        } catch (error) {
            return null;
        }
    }
}