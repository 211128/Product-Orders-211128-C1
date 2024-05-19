import { Product } from "./product";

export interface IProductRepository {
  createProduct(
    name: string,
    price: number,
    stock: number,
  ): Promise<Product | null>;

  listAllProducts(): Promise<Product[] | null>;

  deleteProductById(id: string): Promise<string | null>;

  updateProduct(
    id: number,
    name?: string,
    stock?: number,
): Promise<Product | null>
}