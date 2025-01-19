import { UsersModel } from '../models/users.models.js';

export const UsersController = {
    async createUser(req, res) {
        try {
            const userData = req.body;
            const user = await UsersModel.createUser(userData);
            res.status(201).json(user);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Failed to create user' });
        }
    },

    async getUserByQr(req, res) {
        try {
            const { uuid } = req.params;
            const user = await UsersModel.getUserByUuid(uuid);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user by QR:', error);
            res.status(500).json({ message: 'Failed to fetch user' });
        }
    },

    //get all users
    async getAllUsers(req, res) {
        try {
            const users = await UsersModel.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error('Error fetching all users:', error);
            res.status(500).json({ message: 'Failed to fetch users' });
        }
    },
};
