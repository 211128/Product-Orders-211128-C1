import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { Signale } from "signale";

const signale = new Signale();
dotenv.config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
};

// Crear el pool de conexiones
const pool = mysql.createPool(config);

export async function query(sql: string, params?: any[]) {
    try {
        const conn = await pool.getConnection();
        signale.success("Conexión exitosa a la BD");
        const result = await conn.execute(sql, params);
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

        const databaseName = process.env.DB_DATABASE;

        await conn.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
        signale.success(`Base de datos '${databaseName}' creada o verificada exitosamente`);
        conn.end();

        // Verificar y crear las tablas necesarias
        await createTables();
    } catch (error) {
        signale.error("Error al crear o verificar la base de datos:", error);
    }
}

// Función para crear las tablas si no existen
async function createTables() {
    try {
        // Aquí puedes ejecutar las consultas SQL para crear las tablas
        // Por ejemplo:
        await query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price VARCHAR(255) NOT NULL,
                stock VARCHAR(255) NOT NULL
            )
        `);

        // Puedes agregar más consultas para crear otras tablas según sea necesario

        signale.success("Tablas creadas o verificadas exitosamente");
    } catch (error) {
        signale.error("Error al crear o verificar las tablas:", error);
    }
}

// Llamar a la función para crear la base de datos si no existe al iniciar la aplicación
createDatabaseIfNotExists();
