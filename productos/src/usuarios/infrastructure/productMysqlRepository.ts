import { query } from "../../database/conecction";
import { Product } from "../domain/product";
import { IProductRepository } from "../domain/userRepository";

export class ProductMysqlRepository implements IProductRepository {
  async createProduct(name: string, price: number, stock: number): Promise<Product | null> {
    try {
      const sql = "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)";
      const params: any[] = [name, price, stock];
      const [result]: any = await query(sql, params);
      if (result.insertId) {
        // Crear una instancia de User con el ID generado
        const user = new Product(result.insertId, name, price, stock);
        return user;
      } else {
        console.error("No se pudo insertar el producto en la base de datos.");
        return null;
      }
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      return null;
    }
    
  }

  async listAllProducts(): Promise<Product[] | null> {
    console.log("hola")
    try {
      const sql = "SELECT * FROM products"; // Cambiado a "Products" con mayúscula según la tabla de la base de datos
      const [rows]: any = await query(sql);

      if (!Array.isArray(rows)) {
        throw new Error('Rows is not an array');
      }

      // Mapear los resultados directamente a instancias de User
      const products: Product[] = rows.map((row: any) => {
        return new Product(
          row.ID,      // Cambiado a "ID" con mayúscula según la columna de la base de datos
          row.name,    // Cambiado a "Name" con mayúscula según la columna de la base de datos
          row.price,   // Cambiado a "Email" con mayúscula según la columna de la base de datos
          row.stock,   // Cambiado a "Phone" con mayúscula según la columna de la base de datos
        
        );
      });

      return products;
    } catch (error) {
      console.error("Error al listar producto:", error);
      return null; // Opcionalmente, podrías lanzar una excepción en lugar de retornar null
    }
  }
  async deleteProductById(id: string): Promise<string | null> {
    try {
        const sql = 'DELETE FROM products WHERE id = ?';
        const result: any = await query(sql, [id]);

        if (!result || result.affectedRows === 0) {
            return 'No se encontró ningún producto con el ID proporcionado.';
        }

        return 'producto eliminado exitosamente.';
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw error; // Puedes manejar el error de la manera que prefieras o simplemente lanzarlo para que se maneje en un nivel superior.
    }
}



async updateProduct(id: number, name?: string, stock?: number, price?: number): Promise<Product | null> {
  const updates: { [key: string]: any } = {};
  if (name !== undefined) updates.name = name;
  if (stock !== undefined) updates.stock = stock;
  if (price !== undefined) updates.price = price;

  const keys = Object.keys(updates);
  if (keys.length === 0) return null; // No hay nada que actualizar.

  const sqlParts = keys.map(key => `${key} = ?`);
  const sql = `UPDATE products SET ${sqlParts.join(', ')} WHERE id = ?`;

  try {
    const values = keys.map(key => updates[key]);
    values.push(id);
    await query(sql, values);
    const [updatedRows]: any = await query('SELECT * FROM products WHERE id = ?', [id]);
    if (!updatedRows || updatedRows.length === 0) {
      throw new Error('No hay productos con esa ID.');
    }

    const updatedProduct = new Product(
      updatedRows[0].id,
      updatedRows[0].name,
      updatedRows[0].price,
      updatedRows[0].stock,
    );

    return updatedProduct;
  } catch (error) {
    console.error('Error updating producto:', error);
    throw error; // O maneja el error de la manera que prefieras.
  }
}

}
