import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { Signale } from "signale";

const signale = new Signale();
dotenv.config();

const configOrdersDb = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_ORDERS_DATABASE,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
};



// Crear el pool de conexiones
const poolOrdersDb = mysql.createPool(configOrdersDb);

// Función para ejecutar consultas SQL
export async function query(sql: string, params: any[], pool: mysql.Pool) {
    try {
        const conn = await pool.getConnection();
        signale.success("Conexión exitosa a la BD");
        const [result] = await conn.execute(sql, params);
        conn.release();
        return result;
    } catch (error) {
        console.log(process.env.DB_HOST);
        signale.error(error);
        return null;
    }
}

// Función para crear la base de datos si no existe
export async function createDatabaseIfNotExists() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        const ordersDatabaseName = process.env.DB_ORDERS_DATABASE;

        await conn.query(`CREATE DATABASE IF NOT EXISTS \`${ordersDatabaseName}\``);
        signale.success(`Base de datos '${ordersDatabaseName}' creada o verificada exitosamente`);


        conn.end();

        // Verificar y crear las tablas necesarias
        await createTables();
    } catch (error) {
        signale.error("Error al crear o verificar la base de datos:", error);
    }
}
export { poolOrdersDb };

// Función para crear las tablas si no existen
async function createTables() {
    try {
       
        // Crear las tablas en la base de datos de órdenes
        await query(`
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                total DECIMAL(10, 2) NOT NULL,
                date DATETIME NOT NULL,
                status ENUM('Pagado', 'Creado', 'Enviado') NOT NULL
            )
        `, [], poolOrdersDb);

        // Crear la tabla de asociación en la base de datos de órdenes, con referencias completas a las tablas en sus respectivas bases de datos
        await query(`
            CREATE TABLE IF NOT EXISTS orders_products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                product_id INT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                quantity INT NOT NULL
            )
        `, [], poolOrdersDb);

        signale.success("Tablas creadas o verificadas exitosamente");
    } catch (error) {
        signale.error("Error al crear o verificar las tablas:", error);
    }
}

// Llamar a la función para crear la base de datos si no existe al iniciar la aplicación
createDatabaseIfNotExists();

