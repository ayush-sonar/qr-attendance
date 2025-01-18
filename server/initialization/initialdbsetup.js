import {pool} from '../config/db.js';

const createEnum = `
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_enum') THEN
        CREATE TYPE event_enum AS ENUM (
            'DSA', 
            'CTF', 
            'UIUX', 
            'DSA&CTF', 
            'UIUX&CTF', 
            'DSA&UIUX', 
            'ALL3'
        );
    END IF;
END $$;
`;

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    team_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    number VARCHAR(15) UNIQUE NOT NULL,
    events_registered_for event_enum NOT NULL,
    event_uiux_checkin BOOLEAN DEFAULT FALSE,
    event_uiux_checkout BOOLEAN DEFAULT FALSE,
    event_ctf_checkin BOOLEAN DEFAULT FALSE,
    event_ctf_checkout BOOLEAN DEFAULT FALSE,
    event_dsa_checkin BOOLEAN DEFAULT FALSE,
    event_dsa_checkout BOOLEAN DEFAULT FALSE,
    qr_uuid UUID UNIQUE
);
`;

const createQrTable = `
CREATE TABLE IF NOT EXISTS qr (
    id SERIAL PRIMARY KEY,
    uuid UUID UNIQUE,
    user_id INT REFERENCES users(id)
);
`;

const setup = async () => {
    try {
        const response = await pool.query(createEnum);
        console.log("Created enum:", response);
        const response2 = await pool.query(createUsersTable);
        console.log("Created users table:", response2);
        const response3 = await pool.query(createQrTable);
        console.log("Created qr table:", response3);
    } catch (error) {
        console.error("Error setting up the database!", error.stack);
        throw error;
    }
} 

export { setup };