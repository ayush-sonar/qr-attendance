import { AdminModel } from '../models/admin.models.js';

export const AdminController = {
    async loginAdmin(email, password) {
        try {
            // Fetch the admin by email
            const admin = await AdminModel.getAdminByEmail(email);

            if (!admin) {
                console.log('Admin not found.');
                return { success: false, message: 'Invalid credentials' };
            }

            // Compare plain text password 
            if (admin.password === password) {
                console.log('Admin logged in successfully.');
                return { success: true, message: 'Login successful', admin };
            } else {
                console.log('Invalid password.');
                return { success: false, message: 'Invalid credentials' };
            }
        } catch (error) {
            console.error('Error during admin login:', error);
            return { success: false, message: 'An error occurred during login' };
        }
    }
};
