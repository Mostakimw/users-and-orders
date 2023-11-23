import { z } from 'zod';

//  order
const OrderSchemaZod = z.object({
  productName: z.string().refine((data) => data.trim() !== '', {
    message: 'Product name is required',
  }),
  price: z.number().refine((data) => data > 0, {
    message: 'Product price is required and should be greater than 0',
  }),
  quantity: z.number().refine((data) => data > 0, {
    message: 'Product quantity is required and should be greater than 0',
  }),
});

export default OrderSchemaZod;
