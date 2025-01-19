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
        // Update both tables in sequence
        const updateQrSql = `
            UPDATE qr
            SET user_id = $1
            WHERE uuid = $2
            RETURNING *;
        `;

        const updateUserSql = `
            UPDATE users
            SET qr_uuid = $1, qr_id = $2
            WHERE id = $3
            RETURNING *;

        `;

        const QRresult = await query(updateQrSql, [userId, uuid]);
        console.log("DEBUGGG", QRresult.rows[0].id);
        const qrId = QRresult.rows[0].id;
        const userResult = await query(updateUserSql, [uuid, qrId, userId]);
        return userResult.rows[0];
    },
};
