"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.errorHandler = exports.AppError = void 0;
const zod_1 = require("zod");
const library_1 = require("@prisma/client/runtime/library");
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
const errorHandler = (err, _req, res, next) => {
    // Handle Zod validation errors
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            message: 'Validation failed',
            errors: err.errors.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
            })),
        });
        return;
    }
    // Handle Prisma errors
    if (err instanceof library_1.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            res.status(409).json({
                message: 'Record already exists',
            });
            return;
        }
        if (err.code === 'P2025') {
            res.status(404).json({
                message: 'Record not found',
            });
            return;
        }
        res.status(500).json({
            message: 'Database error',
        });
        return;
    }
    // Handle Prisma validation errors
    if (err instanceof library_1.PrismaClientValidationError) {
        res.status(400).json({
            message: 'Invalid data provided',
        });
        return;
    }
    // Handle custom AppError
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            message: err.message,
        });
        return;
    }
    // Handle all other errors
    console.error('Unhandled error:', err);
    res.status(500).json({
        message: 'Internal server error',
    });
    return;
};
exports.errorHandler = errorHandler;
// Type-safe async handler
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
