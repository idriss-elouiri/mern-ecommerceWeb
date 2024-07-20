import { z } from "zod";

export const productShcema = z.object({
  title: z.string({ required_error: "title is required" }),
  content: z
    .string({ required_error: "content is required" }),
  price: z
    .number({ required_error: "price is required" }),
  category: z
    .string({ required_error: "category is required" }),
});


