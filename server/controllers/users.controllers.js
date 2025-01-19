import e from 'express';
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

    //checkIn or checkOut
    async checkInOrOutDSA(req, res) {
        try {
            const uuid1 = req.params.uuid;
            const event = await UsersModel.checkEvents(uuid1);
            console.log(event);
            if (event == undefined) {
                res.status(400).json({ message: 'QR not assigned' });
            }
            else if (event === 'DSA'|| event === 'DSA&UIUX'|| event === 'DSA&CTF'|| event === 'ALL3') {
                if (req.body.task == "checkin") {
                    const { uuid } = req.params;
                    const result = await UsersModel.checkInDSA(uuid);
                    if (result === true) {
                        res.json({ message: 'User checked in successfully' });
                    } else {
                        res.status(400).json({ message: 'User already checked in' });
                    }
                }
                else if (req.body.task == "checkout") {
                    const { uuid } = req.params;
                    const result = await UsersModel.checkOutDSA(uuid);
                    if (result === true) {
                        res.json({ message: 'User checked out successfully' });
                    } else {
                        res.status(400).json({ message: 'User already checked out or not checked in' });
                    }
                }
            }
            else{
                res.status(400).json({ message: 'User not registered for DSA' });
            }
                
        } catch (error) {
            console.log('Error checking in or out:', error);
        }
    },


    async checkInOrOutUIUX(req, res) {
        try {
            const uuid1 = req.params.uuid;
            const event = await UsersModel.checkEvents(uuid1);
            console.log(event);
            if (event == undefined) {
                res.status(400).json({ message: 'QR not assigned' });
            }
            else if (event === 'UIUX'|| event === 'DSA&UIUX'|| event === 'UIUX&CTF'|| event === 'ALL3'){
                if (req.body.task == "checkin") {
                    const { uuid } = req.params;
                    const result = await UsersModel.checkInUIUX(uuid);
                    if (result === true) {
                        res.json({ message: 'User checked in successfully' });
                    } else {
                        res.status(400).json({ message: 'User already checked in' });
                    }
                }
                else if (req.body.task == "checkout") {
                    const { uuid } = req.params;
                    const result = await UsersModel.checkOutUIUX(uuid);
                    if (result === true) {
                        res.json({ message: 'User checked out successfully' });
                    } else {
                        res.status(400).json({ message: 'User already checked out or not checked in' });
                    }
                }
            }
            else{
                res.status(400).json({ message: 'User not registered for UIUX' });}
        } catch (error) {
            console.log('Error checking in or out:', error);
        }
    },

    async checkInOrOutCTF(req, res) {
        try {
            const uuid1 = req.params.uuid;
            const event = await UsersModel.checkEvents(uuid1);
            console.log(event);
            if (event == undefined) {
                res.status(400).json({ message: 'QR not assigned' });
            }
            else if(event === 'CTF' || event === 'DSA&CTF' || event === 'UIUX&CTF' || event === 'ALL3'){
                if (req.body.task == "checkin") {
                    const { uuid } = req.params;
                    const result = await UsersModel.checkInCTF(uuid);
                    if (result === true) {
                        res.json({ message: 'User checked in successfully' });
                    } else {
                        res.status(400).json({ message: 'User already checked in' });
                    }
                }
                else if (req.body.task == "checkout") {
                    const { uuid } = req.params;
                    const result = await UsersModel.checkOutCTF(uuid);
                    if (result === true) {
                        res.json({ message: 'User checked out successfully' });
                    } else {
                        res.status(400).json({ message: 'User already checked out or not checked in' });
                    }
                }
            }
            else{
                res.status(400).json({ message: 'User not registered for CTF' });}
        } catch (error) {
            console.log('Error checking in or out:', error);
        }
    }
};
