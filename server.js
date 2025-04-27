import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import incidentRoutes from './routes/incidentRoutes.js';

dotenv.config()
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', incidentRoutes);
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
