import express from 'express';
import { UsersController } from './controllers/users.controllers.js';
import { QrsController } from './controllers/qrs.controllers.js';

const router = express.Router();

// User routes
router.post('/users', UsersController.createUser);
router.get('/users/:uuid', UsersController.getUserByQr);
router.post('/dsa/:uuid', UsersController.checkInOrOutDSA);
router.post('/uiux/:uuid', UsersController.checkInOrOutUIUX);
router.post('/ctf/:uuid', UsersController.checkInOrOutCTF);
router.get('/users', UsersController.getAllUsers);

// QR routes
router.get('/qrs', QrsController.createQr);
router.get('/qrs/:uuid', QrsController.checkQrStatus);
router.post('/qrs/assign', QrsController.assignQr);

export default router;
