"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.string().default('8080'),
    DATABASE_URL: zod_1.z.string(),
    REDIS_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    JWT_EXPIRES_IN: zod_1.z.string().default('1d'),
    AWS_ACCESS_KEY_ID: zod_1.z.string(),
    AWS_SECRET_ACCESS_KEY: zod_1.z.string(),
    AWS_REGION: zod_1.z.string(),
    AWS_BUCKET_NAME: zod_1.z.string(),
});
const env = envSchema.parse(process.env);
exports.default = env;
