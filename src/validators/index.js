import { z } from 'zod';

const phone = z
  .string()
  .trim()
  .regex(/^[+]?[0-9\s-]{10,15}$/, 'Enter a valid phone number');

const clean = (max = 200) => z.string().trim().max(max);

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

export const enquirySchema = z.object({
  name: clean(100).min(2, 'Name is required'),
  email: z.string().trim().toLowerCase().email('Enter a valid email'),
  phone,
  programme: clean(50).optional(),
  city: clean(80).optional(),
  message: clean(2000).optional(),
  source: z.enum(['contact', 'home', 'programme', 'admissions', 'placements']).optional(),
});

export const applicationSchema = z.object({
  programme: z.string().trim().min(2, 'Select a programme'), // slug or code, resolved server side
  applicant: z.object({
    fullName: clean(120).min(2, 'Full name is required'),
    email: z.string().trim().toLowerCase().email('Enter a valid email'),
    phone,
    dateOfBirth: z.coerce.date().optional(),
    gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
    city: clean(80).optional(),
    state: clean(80).optional(),
  }),
  academic: z
    .object({
      lastQualification: clean(120).optional(),
      institution: clean(160).optional(),
      percentage: z.coerce.number().min(0).max(100).optional(),
      passingYear: z.coerce.number().int().min(1990).max(2100).optional(),
      entranceExam: z.enum(['CAT', 'MAT', 'CMAT', 'XAT', 'GMAT', 'CUET', 'UGAT', 'HAT', 'NONE']).optional(),
      entranceScore: z.coerce.number().min(0).optional(),
    })
    .optional(),
  statementOfPurpose: clean(3000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'You must accept the declaration' }) }),
});

export const tourSchema = z.object({
  name: clean(100).min(2),
  email: z.string().trim().toLowerCase().email(),
  phone,
  preferredDate: z.coerce.date().refine((d) => d.getTime() > Date.now() - 24 * 3600 * 1000, 'Choose a future date'),
  timeSlot: z.enum(['morning', 'afternoon']).optional(),
  visitors: z.coerce.number().int().min(1).max(10).optional(),
  programmeInterest: clean(50).optional(),
  message: clean(1000).optional(),
});

export const statusUpdateSchema = z.object({
  status: z.string().trim().min(2),
  note: clean(500).optional(),
});

export const settingSchema = z.object({ value: z.any() });
