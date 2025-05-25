import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { MONGO_URL } from './config';
import userRoutes from './routes/userRoutes';
import creatorRoutes from './routes/creatorRoutes';

let app = express();

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRoutes);
app.use('/api/creator', creatorRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    main();
}); 