import { pool } from "../db.js";
import { v4 as uuidv4 } from "uuid";

export default class User {

    static table_name = "users";

    // Obtener todos los usuarios
    static async getAll() {
        const [result] = await pool.query(`SELECT * FROM ${this.table_name}`);
        return result;
    }

    static async getByEmail(email) {
        const [result] = await pool.query(`SELECT * FROM ${this.table_name} WHERE email = ?`, [email]);
        return result[0]; // Regresa el primer resultado si existe
    }

    // Obtener un usuario por ID
    static async getById(id) {
        const [result] = await pool.query(`SELECT * FROM ${this.table_name} WHERE id = ?`, [id]);
        return result[0]; // Regresa el primer resultado si existe
    }

    // Crear un nuevo usuario
    static async create({ name, email, password, phone, address }) {
        const [result] = await pool.query(
            `INSERT INTO ${this.table_name} (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?, ?)`,
            [uuidv4(), name, email, password, phone, address]
        );
        return result.insertId; // Regresa el ID del nuevo usuario
    }

    // Actualizar un usuario existente
    static async update(id, { name, email, password, phone, address }) {
        const [result] = await pool.query(
            `UPDATE ${this.table_name} SET name = ?, email = ?, password = ?, phone = ?, address = ? WHERE id = ?`,
            [name, email, password, phone, address, id]
        );
        return result.affectedRows; // Regresa el número de filas afectadas
    }

    // Eliminar un usuario
    static async delete(id) {
        const [result] = await pool.query(`DELETE FROM ${this.table_name} WHERE id = ?`, [id]);
        return result.affectedRows; // Regresa el número de filas afectadas
    }
}
