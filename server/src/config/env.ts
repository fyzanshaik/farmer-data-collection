import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	PORT: z.string().default('8080'),
	DATABASE_URL: z.string(),
	REDIS_URL: z.string(),
	JWT_SECRET: z.string(),
	JWT_EXPIRES_IN: z.string().default('1d'),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_REGION: z.string(),
	AWS_BUCKET_NAME: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
