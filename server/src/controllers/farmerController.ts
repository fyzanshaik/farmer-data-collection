import { Request, Response } from 'express';
import { Gender, Community } from '@prisma/client';
import prisma from '../lib/prisma';
import { uploadFile } from '../utils/upload';
import { z } from 'zod';
import { createFarmerSchema } from '../schema/zodSchema';

export const createFarmer = async (req: Request, res: Response) => {
	try {
		const {
			name,
			relationInfo,
			gender,
			community,
			aadharNumber,
			state,
			district,
			mandal,
			village,
			panchayat,
			dob,
			age,
			contact,
			bankDetails: { ifscCode, branchName, address, bankName, bankCode },
			fields,
		} = createFarmerSchema.parse(req.body);

		const files = req.files as { [fieldname: string]: Express.Multer.File[] };

		const photoUrl = files.photo ? await uploadFile(files.photo[0].buffer, `farmers-photos/${Date.now()}-${files.photo[0].originalname}`) : null;

		const aadharDocUrl = files.aadharDoc ? await uploadFile(files.aadharDoc[0].buffer, `aadhar-documents/${Date.now()}-${files.aadharDoc[0].originalname}`) : null;

		const landDocUrl = files.landDoc ? await uploadFile(files.landDoc[0].buffer, `land-documents/${Date.now()}-${files.landDoc[0].originalname}`) : null;

		const bankDocUrl = files.bankDoc ? await uploadFile(files.bankDoc[0].buffer, `bank-documents/${Date.now()}-${files.bankDoc[0].originalname}`) : null;

		const farmer = await prisma.farmer.create({
			data: {
				name,
				relationInfo,
				gender: gender as Gender,
				community: community as Community,
				aadharNumber,
				state,
				district,
				mandal,
				village,
				panchayat,
				dateOfBirth: new Date(dob),
				age,
				contact,
				photo: photoUrl,
				aadharDocument: aadharDocUrl,
				landDocument: landDocUrl,
				bankDocument: bankDocUrl,
				bankDetails: {
					create: {
						ifscCode,
						branchName,
						address,
						bankName,
						bankCode,
					},
				},
				fields: {
					create: fields.map((field) => ({
						geoTag: field.geoTag,
						surveyNumber: field.surveyNumber,
						areaInHa: field.areaInHa,
						yieldEstimate: field.yieldEstimate,
					})),
				},
			},
			include: {
				bankDetails: true,
				fields: true,
			},
		});

		res.status(201).json({
			success: true,
			data: farmer,
		});
	} catch (error: any) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({
				success: false,
				error: 'Validation failed',
				details: error.errors,
			});
		}

		if (error.code === 'P2002') {
			return res.status(400).json({
				success: false,
				error: 'Aadhar number already exists',
			});
		}

		console.error('Error creating farmer:', error);

		res.status(500).json({
			success: false,
			error: 'Failed to create farmer',
		});
	}
};

export const getAllFarmers = async (req: Request, res: Response): Promise<void> => {
	try {
		const farmers = await prisma.farmer.findMany({
			include: {
				bankDetails: true,
				fields: true,
			},
		});
		res.json({ success: true, data: farmers });
	} catch (error) {
		res.status(500).json({ success: false, error: 'Failed to fetch farmers' });
	}
};

export const getFarmerById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const farmer = await prisma.farmer.findUnique({
			where: { id },
			include: {
				bankDetails: true,
				fields: true,
			},
		});

		if (!farmer) {
			res.status(404).json({ success: false, error: 'Farmer not found' });
			return;
		}

		res.json({ success: true, data: farmer });
	} catch (error) {
		res.status(500).json({ success: false, error: 'Failed to fetch farmer' });
	}
};

export const updateFarmer = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const files = req.files as { [fieldname: string]: Express.Multer.File[] };
		const photoUrl = files.photo ? await uploadFile(files.photo[0].buffer, `farmers-photos/${Date.now()}-${files.photo[0].originalname}`) : null;

		const aadharDocUrl = files.aadharDoc ? await uploadFile(files.aadharDoc[0].buffer, `aadhar-documents/${Date.now()}-${files.aadharDoc[0].originalname}`) : null;

		const landDocUrl = files.landDoc ? await uploadFile(files.landDoc[0].buffer, `land-documents/${Date.now()}-${files.landDoc[0].originalname}`) : null;

		const bankDocUrl = files.bankDoc ? await uploadFile(files.bankDoc[0].buffer, `bank-documents/${Date.now()}-${files.bankDoc[0].originalname}`) : null;
		const farmer = await prisma.farmer.update({
			where: { id },
			data: {
				...req.body,
				photoUrl,
				aadharDocUrl,
				landDocUrl,
				bankDocUrl,
			},
			include: {
				bankDetails: true,
				fields: true,
			},
		});

		res.json({ success: true, data: farmer });
	} catch (error) {
		res.status(500).json({ success: false, error: 'Failed to update farmer' });
	}
};

export const deleteFarmer = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		await prisma.farmer.delete({
			where: { id },
		});
		res.json({ success: true, message: 'Farmer deleted successfully' });
	} catch (error) {
		res.status(500).json({ success: false, error: 'Failed to delete farmer' });
	}
};

