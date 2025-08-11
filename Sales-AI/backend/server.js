import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import salesRoutes from './routes/sales.js';
import userRoutes from './routes/user.js';

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => res.send('Sales AI Backend Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
