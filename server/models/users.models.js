import { query } from '../config/db.js';

export const UsersModel = {
    async createUser(userData) {
        const sql = `
            INSERT INTO users (name, team_name, email, number, events_registered_for, qr_uuid,qr_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const values = [
            userData.name,
            userData.team_name || null,
            userData.email,
            userData.number,
            userData.events_registered_for,
            userData.qr_uuid || null,
            userData.qr_id || null,
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

    //checkIn or checkOut
    async checkInDSA(uuid) {
      
        const sql = `UPDATE users SET event_dsa_checkin = TRUE WHERE qr_uuid = $1 AND event_dsa_checkin = FALSE;`;
        const result = await query(sql, [uuid]);
        return result.rowCount === 1;
        
    },

    async checkOutDSA(uuid) {
        const sql = `UPDATE users SET event_dsa_checkout = TRUE WHERE qr_uuid = $1 AND event_dsa_checkin = TRUE AND event_dsa_checkout = FALSE;`;
        const result = await query(sql, [uuid]);
        return result.rowCount === 1;
    },

    async checkInUIUX(uuid) {
        const sql = `UPDATE users SET event_uiux_checkin = TRUE WHERE qr_uuid = $1 AND event_uiux_checkin = FALSE;`;
        const result = await query(sql, [uuid]);
        return result.rowCount === 1;
    },

    async checkOutUIUX(uuid) {
        const sql = `UPDATE users SET event_uiux_checkout = TRUE WHERE qr_uuid = $1 AND event_uiux_checkin = TRUE AND event_uiux_checkout = FALSE ;`;
        const result = await query(sql, [uuid]);
        return result.rowCount === 1;
    },

    async checkInCTF(uuid) {
        const sql = `UPDATE users SET event_ctf_checkin = TRUE WHERE qr_uuid = $1 AND event_ctf_checkin = FALSE;`;
        const result = await query(sql, [uuid]);
        return result.rowCount === 1;
    },

    async checkOutCTF(uuid) {
        const sql = `UPDATE users SET event_ctf_checkout = TRUE WHERE qr_uuid = $1 AND event_ctf_checkin = TRUE AND event_ctf_checkout = FALSE ;`;
        const result = await query(sql, [uuid]);
        return result.rowCount === 1;
    },

    async checkEvents(uuid) {
        const sql = `SELECT events_registered_for FROM users WHERE qr_uuid = $1;`;
        const result = await query(sql, [uuid]);
        if (result.rowCount === 0) {
            return undefined;
        }
        return result.rows[0].events_registered_for;
    }
    
};
