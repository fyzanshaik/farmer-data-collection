import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/error';
import router from './routes/indexRoute';
import env from './config/env';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
});
app.use(limiter);

app.use('/', router);
// app.use('/api/v1') for working api
app.use(errorHandler);

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
