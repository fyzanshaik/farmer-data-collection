import { Request, Response } from 'express';

export const pingController = async (req: Request, res: Response) => {
	res.json({
		message: 'PONG',
		ServerHealth: 'Server is working',
	});
};
