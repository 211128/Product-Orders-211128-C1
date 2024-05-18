import { poolOrdersDb, query } from "../../database/conecction";
import { Orders } from "../domain/orders";
import { IOrdersRepository } from "../domain/ordersRepository";

export class ProductMysqlRepository implements IOrdersRepository {
  
  async createOrder(total: number, date: Date, status: string): Promise<Orders | null> {
    try {
      const sql = "INSERT INTO orders (total, date, status) VALUES (?, ?, ?)";
      const params: any[] = [total, date.toISOString().slice(0, 19).replace('T', ' '), status];
      const [result]: any = await query(sql, params, poolOrdersDb);
      if (result.insertId) {
        const order = new Orders(result.insertId, total, date, status);
        return order;
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
      const [rows]: any = await query(sql, [], poolOrdersDb);
      if (!Array.isArray(rows)) {
        throw new Error('Rows is not an array');
      }
      const orders: Orders[] = rows.map((row: any) => {
        return new Orders(row.id, row.total, new Date(row.date), row.status);
      });
      return orders;
    } catch (error) {
      console.error("Error al listar órdenes:", error);
      return null;
    }
  }
  

  async updateOrders(id: number, total?: number, date?: Date, status?: string): Promise<Orders | null> {
    const updates: { [key: string]: any } = {};
    if (total !== undefined) updates.total = total;
    if (date !== undefined) updates.date = date.toISOString().slice(0, 19).replace('T', ' ');
    if (status !== undefined) updates.status = status;

    const keys = Object.keys(updates);
    if (keys.length === 0) return null;

    const sqlParts = keys.map(key => `${key} = ?`);
    const sql = `UPDATE orders SET ${sqlParts.join(', ')} WHERE id = ?`;

    try {
      const values = keys.map(key => updates[key]);
      values.push(id);
      await query(sql, values, poolOrdersDb);
      const [updatedRows]: any = await query('SELECT * FROM orders WHERE id = ?', [id], poolOrdersDb);
      if (!updatedRows || updatedRows.length === 0) {
        throw new Error('No hay órdenes con esa ID.');
      }

      const updatedOrder = new Orders(
        updatedRows[0].id,
        updatedRows[0].total,
        new Date(updatedRows[0].date),
        updatedRows[0].status,
      );

      return updatedOrder;
    } catch (error) {
      console.error('Error actualizando la orden:', error);
      throw error;
    }
  }
}
