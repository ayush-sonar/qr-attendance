import { query } from '../config/db.js';

export const UsersModel = {
    async createUser(userData) {
        const sql = `
            INSERT INTO users (name, team_name, email, number, events_registered_for, qr_uuid)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [
            userData.name,
            userData.team_name || null,
            userData.email,
            userData.number,
            userData.events_registered_for,
            userData.qr_uuid || null,
            userData.qr_ID || null,
        ];
        const result = await query(sql, values);
        return result.rows[0];
    },

    async getUserByUuid(uuid) {
        const sql = `SELECT * FROM users WHERE qr_uuid = $1;`;
        const result = await query(sql, [uuid]);
        return result.rows[0];
    },

    //get all users
    async getAllUsers() {
        const sql = `SELECT * FROM users;`;
        const result = await query(sql);
        return result.rows;
    },
    
};
