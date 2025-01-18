import { QrsModel } from '../models/qrs.models.js';
import { v4 as uuidv4 } from 'uuid';


export const QrsController = {
    async createQr(req, res) {
        try {
            const uuid = uuidv4();
            const qr = await QrsModel.createQr(uuid);
            res.status(201).json(qr);
        } catch (error) {
            console.error('Error creating QR:', error);
            res.status(500).json({ message: 'Failed to create QR' });
        }
    },

    async checkQrStatus(req, res) {
        try {
            const { uuid } = req.params;
            const qr = await QrsModel.isQrAssigned(uuid);
            if (qr) {
                res.json(qr);
            } else {
                res.status(404).json({ message: 'QR code not found or unassigned' });
            }
        } catch (error) {
            console.error('Error checking QR status:', error);
            res.status(500).json({ message: 'Failed to check QR status' });
        }
    },

    async assignQr(req, res) {
        try {
            const { uuid, userId } = req.body;
            const qr = await QrsModel.assignQrToUser(uuid, userId);
            res.json(qr);
        } catch (error) {
            console.error('Error assigning QR to user:', error);
            res.status(500).json({ message: 'Failed to assign QR' });
        }
    },
};
