import { z } from 'zod';

// fullName
const FullNameSchemaZod = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});

// address
const AddressSchemaZod = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

//  order
const OrderSchemaZod = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// user
const UserSchemaZod = z.object({
  userId: z.number().min(1).max(20),
  username: z.string().min(1).max(20),
  password: z.string().min(1),
  fullName: FullNameSchemaZod,
  age: z.number().min(1),
  email: z.string().email(),
  isActive: z.enum(['active', 'inactive']),
  hobbies: z.array(z.string()),
  address: AddressSchemaZod,
  orders: z.array(OrderSchemaZod),
});

export default UserSchemaZod;
