import express from 'express';
import measureRoutes from './routes/measureRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import path from 'path';

const app = express();

// Serve static files from the "src/assets" directory
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));

app.use(express.json());
app.use('/api/measures', measureRoutes);

app.use(errorMiddleware);

export default app;