import { Product } from "../domain/product";
import { IProductRepository as IProductRepository } from "../domain/productRepository";

export class ListAllProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  
  async run(): Promise<Product[] | null> {
    console.log("listando")
    try {
      const listAllActiveUser = await this.productRepository.listAllProducts();
      if (listAllActiveUser) {
        return listAllActiveUser;
      } else {
        throw new Error("No se encontraron productos.");
      }
    } catch (err: any) {
      // Lanza una excepción con un mensaje de error específico.
      throw new Error("Error al obtener la lista de productos: " + err.message);
    }
  }
}
