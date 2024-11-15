import { z } from 'zod';

const fieldSchema = z.object({
	geoTag: z
		.object({
			latitude: z.number(),
			longitude: z.number(),
		})
		.or(z.string().transform((s) => JSON.parse(s))),
	surveyNumber: z.string().min(1, 'Survey number is required'),
	areaInHa: z.number().positive('Area must be positive'),
	yieldEstimate: z.number().positive('Yield estimate must be positive'),
});

const createFarmerSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	relationInfo: z.string().min(1, 'Relation info is required'),
	gender: z.enum(['MALE', 'FEMALE', 'OTHER'] as const),
	community: z.enum(['GENERAL', 'OBC', 'BC', 'SC', 'ST'] as const),
	aadharNumber: z.string().length(12, 'Aadhar number must be 12 digits'),
	state: z.string().min(1, 'State is required'),
	district: z.string().min(1, 'District is required'),
	mandal: z.string().min(1, 'Mandal is required'),
	village: z.string().min(1, 'Village is required'),
	panchayat: z.string().min(1, 'Panchayat is required'),
	dob: z.string().transform((str) => new Date(str)),
	age: z.number().int().min(0),
	contact: z.string().min(10, 'Contact number must be at least 10 digits'),
	bankDetails: z.object({
		ifscCode: z.string().min(1, 'IFSC code is required'),
		branchName: z.string().min(1, 'Branch name is required'),
		address: z.string().min(1, 'Bank address is required'),
		bankName: z.string().min(1, 'Bank name is required'),
		bankCode: z.string().min(1, 'Bank code is required'),
	}),
	fields: z.array(fieldSchema).min(1, 'At least one field is required'),
});

export { createFarmerSchema };
