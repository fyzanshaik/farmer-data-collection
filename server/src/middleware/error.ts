// src/middleware/error.ts
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';

export class AppError extends Error {
	constructor(
		public message: string,
		public statusCode: number
	) {
		super(message);
	}
}

export const errorHandler: ErrorRequestHandler = (err: Error | ZodError | PrismaClientKnownRequestError | AppError, _req: Request, res: Response, next: NextFunction): void => {
	// Handle Zod validation errors
	if (err instanceof ZodError) {
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
	if (err instanceof PrismaClientKnownRequestError) {
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
	if (err instanceof PrismaClientValidationError) {
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

// Type-safe async handler
export const asyncHandler = <T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};
