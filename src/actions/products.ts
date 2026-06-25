'use server';

import db from '@/lib/db';
import { ProductsAction, Product } from '@/types/global';

export async function productsAction(): Promise<ProductsAction> {
  const result = (await db.query(`SELECT * FROM products`)) as Product[];
  return {
    status: 200,
    body: 'get products success',
    data: result,
  };
}

export async function productAction(id: number) {
  const result = (await db.query(
    `SELECT * FROM products WHERE id = ${id}`,
  )) as Product[];
  return {
    status: 200,
    body: 'get product success',
    data: result[0],
  };
}
