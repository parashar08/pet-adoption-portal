import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const corsOptions = {
  origin: 'https://client-46yl.onrender.com',
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

import userRoute from './routes/userRoute.js';
import petRoute from './routes/petRoute.js';

app.use('/api/user', userRoute);
app.use('/api/pet', petRoute);

export default app;
