import { pool } from '../config/db.js';

export const AdminModel = {
    async getAdminByEmail(email) {
        const sql = `SELECT * FROM admins WHERE email = $1;`;
        const result = await pool.query(sql, [email]);
        return result.rows[0];
    }
};
