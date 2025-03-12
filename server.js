import express from 'express';
import mongoose from 'mongoose';
import paymentRoutes from './src/routes/paymentRoutes.js';
import dotenv from 'dotenv';
import orderRoutes from './src/routes/orderRoutes.js';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import { protect } from './src/middlewares/auth.middleware.js';
import checkoutRoutes from './src/routes/checkoutRoutes.js'; // Import the new route

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

 mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
 })
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('MongoDB Connection Error:', error));

app.use(express.json());

app.use('/api', authRoutes);

// Example of a protected route
app.get('/api/orders', protect, (req, res) => {
  res.json({ message: 'Order data' });
});

// Example of an admin route
app.post('/api/products', protect, (req, res) => {
  res.json({ message: 'Product added' });
});

app.use('/api', authRoutes);
app.use('/api/', orderRoutes);
app.use('/api', checkoutRoutes); // Use the new route
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
