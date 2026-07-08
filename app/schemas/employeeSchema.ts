import { z } from "zod";

export const employeeSchema = z.object({
  employeeId: z
    .string()
    .min(1, "Employee ID is required"),

  fullName: z
    .string()
    .min(3, "Employee name must be at least 3 characters"),

  email: z
    .string()
    .email("Please enter a valid email"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  postalCode: z
    .string()
    .regex(
      /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
      "Invalid Canadian postal code"
    ),

  position: z
    .string()
    .min(2, "Position is required"),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;