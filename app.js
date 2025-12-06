import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/connectdb.js';
import userRouter from './routers/userRouters.js';

const app = express();
const port = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";
connectDB(DATABASE_URL);
app.use(express.json());
app.use('/api/users', userRouter);
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
})