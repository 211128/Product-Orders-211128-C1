import { Product } from "../domain/product";
import { IProductRepository } from "../domain/productRepository";


export class UpdateProductUseCase {
    constructor(readonly userRepository: IProductRepository) {}
    
    async run(
        id: number,
        name?: string,
        stock?: number,
        ): Promise<Product | null> {
        console.log("updated")
        try {
            const updateUserById = await this.userRepository.updateProduct(id,name,stock);
            return updateUserById;
        } catch (error) {
            return null;
        }
    }
}