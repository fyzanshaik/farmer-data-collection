import { z } from "zod";

// Enums
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum Community {
  GENERAL = "GENERAL",
  OBC = "OBC",
  BC = "BC",
  SC = "SC",
  ST = "ST",
}

export const createFarmerSchema = z.object({
  name: z.string(),
  relationInfo: z.string(),
  gender: z.nativeEnum(Gender),
  community: z.nativeEnum(Community),
  aadharNumber: z.string().length(12),
  state: z.string(),
  district: z.string(),
  mandal: z.string(),
  village: z.string(),
  panchayat: z.string(),
  dob: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  age: z.number().int().positive(),
  contact: z.string().min(10).max(15),
  bankDetails: z.object({
    ifscCode: z.string(),
    branchName: z.string(),
    address: z.string(),
    bankName: z.string(),
    bankCode: z.string(),
  }),
  fields: z.array(
    z.object({
      geoTag: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
      surveyNumber: z.string(),
      areaInHa: z.number().positive(),
      yieldEstimate: z.number().positive(),
    })
  ),
});

export type CreateFarmerInput = z.infer<typeof createFarmerSchema>;

export type BankDetailsInput = z.infer<
  typeof createFarmerSchema.shape.bankDetails
>;

export type FieldInput = z.infer<
  typeof createFarmerSchema.shape.fields
>[number];
