import * as z from "zod";

export const CreateUserSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string()
});
