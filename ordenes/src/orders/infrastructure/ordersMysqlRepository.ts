import { poolOrdersDb, query } from "../../database/conecction";
import { Orders } from "../domain/orders";
import { IOrdersRepository } from "../domain/ordersRepository";

export class ProductMysqlRepository implements IOrdersRepository {

  async createOrder(total: number, status: string): Promise<Orders | null> {
    try {
        const sql = "INSERT INTO orders (total, status) VALUES (?, ?)";
        const params: any[] = [total, status];
        const result: any = await query(sql, params);

        if (result && result[1] && result[1].insertId) {
            const insertedId = result[1].insertId;

            const [rows]: any = await query("SELECT * FROM orders WHERE id = ?", [insertedId]);
            if (rows && rows[0]) {
                const { id, total, status } = rows[0];
                return new Orders(id, total, status);
            } else {
                console.error("No se pudo recuperar la orden recién creada.");
                return null;
            }
        } else {
            console.error("No se pudo insertar la orden en la base de datos.");
            return null;
        }
    } catch (error) {
        console.error("Error al registrar la orden:", error);
        return null;
    }
}


async listAllOrders(): Promise<Orders[] | null> {
  try {
    const sql = "SELECT * FROM orders";
    const [rows]: any = await query(sql);

    if (!Array.isArray(rows)) {
      throw new Error('Rows is not an array');
    }

    const orders: Orders[] = rows.map((row: any) => {
      return new Orders(
        row.id,
        row.total,
        row.status
      );
    });

    return orders;
  } catch (error) {
    console.error("Error al listar órdenes:", error);
    return null;
  }
}



  async updateOrders(id: number, status?: string): Promise<Orders | null> {
    const updates: { [key: string]: any } = {};
    if (status !== undefined) updates.status = status;

    const keys = Object.keys(updates);
    if (keys.length === 0) return null;

    if (status === "pagado") {
      return let = ""
    }

    const sqlParts = keys.map(key => `${key} = ?`);
    const sql = `UPDATE orders SET ${sqlParts.join(', ')} WHERE id = ?`;

    try {
      const values = keys.map(key => updates[key]);
      values.push(id);
      await query(sql, values);
      const result: any = await query('SELECT * FROM orders WHERE id = ?', [id]);
      const updatedRows = result[0];
      if (!updatedRows || updatedRows.length === 0) {
        throw new Error('No hay órdenes con esa ID.');
      }

      const updatedOrder = new Orders(
        updatedRows[0].id,
        updatedRows[0].total,
        updatedRows[0].status
      );

      return updatedOrder;
    } catch (error) {
      console.error('Error actualizando la orden:', error);
      throw error;
    }
  }

  
}
