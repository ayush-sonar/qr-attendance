import express from 'express';
import { setup } from './initialization/initialdbsetup.js';
import router from './routes.js';
import cors from 'cors';
import { AdminController } from './controllers/admin.controllers.js';



const app = express();

app.use(cors({
    origin: ['http://localhost:5174','https://qr-attendance-henna.vercel.app'], // Your frontend URL
    credentials: true // If you're using cookies
  }));

// Middleware to parse JSON request bodies
app.use(express.json());


// Database setup route
app.get('/setup', async (req, res) => {
    try {
        await setup();
        res.send('Database setup complete!');
    } catch (error) {
        console.error('Error during database setup:', error);
        res.status(500).send('Database setup failed!');
    }
});

// API routes for users and QR management
app.use('/api', router);

// Admin login simulation
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const result = await AdminController.loginAdmin(email, password);

        if (result.success) {
            res.json(result);
        } else {
            res.status(401).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during login' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
