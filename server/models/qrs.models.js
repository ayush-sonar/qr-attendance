import { query } from '../config/db.js';

export const QrsModel = {
    async createQr(uuid) {
        const sql = `
            INSERT INTO qr (uuid)
            VALUES ($1)
            RETURNING *;
        `;
        const result = await query(sql, [uuid]);
        return result.rows[0];
    },

    async isQrAssigned(uuid) {
        const sql = `SELECT * FROM qr WHERE uuid = $1;`;
        const result = await query(sql, [uuid]);
        return result.rows[0];
    },

    async assignQrToUser(uuid, userId) {
        const sql = `
            UPDATE qr
            SET user_id = $1
            WHERE uuid = $2
            RETURNING *;
        `;
        const result = await query(sql, [userId, uuid]);
        return result.rows[0];
    },
};
