import { Product } from "../domain/product";
import { IProductRepository } from "../domain/productRepository";

export class DeleteProductUseCase {
    constructor(readonly userRepository: IProductRepository) {}
    

    async run(id: string): Promise<string | null> {
        try {
            const deleteUser = await this.userRepository.deleteProductById(id);
            
            if (deleteUser) {
                return "producto eliminado correctamente." + "id: " + id;
            } else {
                return "No se pudo eliminar el producto.";
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            
            return null;
        }
    }
}
