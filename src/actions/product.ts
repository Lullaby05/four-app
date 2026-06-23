'use server';

import db from '@/lib/db';
import { ProductionAction, Product } from '@/types/global';

export async function productionAction(): Promise<ProductionAction> {
  const result = (await db.query(`SELECT * FROM products`)) as Product[];
  return {
    status: 200,
    body: 'get products success',
    data: result,
  };
}
