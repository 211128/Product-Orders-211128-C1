import { Product } from "../domain/product";
import { IProductRepository } from "../domain/userRepository";

export class RegisterUseCase {
  constructor(readonly userRepository: IProductRepository) {}

  async run(
    name: string,
    price: number,
    stock: number,
  ): Promise<Product | null> {
    try {
      const createNewUser = await this.userRepository.createProduct(
        name,
        price,
        stock,

      );


      return createNewUser;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      return null; 
    }
  }
}
