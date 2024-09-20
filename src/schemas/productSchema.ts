import * as z from "zod";

export const CreateProduct = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string().optional(),
  type: z.string().optional(),
  regularPrice: z.number(),
  packingPrice: z.number()
});
