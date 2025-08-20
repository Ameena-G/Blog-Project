import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import postRoutes from './routes/postRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:port_number';

app.use(helmet());
app.use(cors({ origin: ORIGIN }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('API is running'));
app.use('/api/posts', postRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
});
