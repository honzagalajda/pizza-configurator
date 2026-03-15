import z from 'zod'

export const pizzaSchema = z.object({
  size: z.enum(['small', 'medium', 'large']),
  crust: z.enum(['regular', 'stuffed']),
  sauce: z.enum(['tomato', 'sour-cream']),
  cheese: z.enum(['none', 'mozzarella', 'blue-cheese']),
  toppings: z.enum([
    'mushrooms',
    'olives',
    'pineapple',
    'salami',
    'corn',
    'chili',
  ]).array().optional(),
  delivery: z.enum(['pickup', 'delivery']),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  address: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.delivery === 'delivery' && !data.address?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Address is required for delivery',
      path: ['address'],
    })
  }
})

export type PizzaFormValues = z.infer<typeof pizzaSchema>
