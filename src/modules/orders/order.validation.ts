import { z } from 'zod';

//  order
const OrderSchemaZod = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export default OrderSchemaZod;
