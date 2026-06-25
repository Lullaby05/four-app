'use server';
import db from '@/lib/db';
import { Address, UpdateAddress } from '@/types/global';
import { revalidatePath } from 'next/cache';

export async function addAddressAction(
  name: string,
  city: string,
  address: string,
  phone: string,
  userId: string,
) {
  await db.query(
    'INSERT INTO addresses (userId, name, city, address, phone) VALUES ($1, $2, $3, $4, $5)',
    [userId, name, city, address, phone],
  );
  revalidatePath('/account');
  return {
    status: 200,
    body: 'add address success',
  };
}

export async function addressAction(userId: string) {
  const result = (await db.query('SELECT * FROM addresses WHERE userId = $1', [
    userId,
  ])) as Address[];
  return {
    status: 200,
    message: 'get addresses success',
    data: result,
  };
}

export async function removeAddressAction(id: number) {
  await db.query('DELETE FROM addresses WHERE id = $1', [id]);
  revalidatePath('/account');
  return {
    status: 200,
    body: 'remove address success',
  };
}

export async function updateAddressAction(id: number, data: UpdateAddress) {
  await db.query(
    'UPDATE addresses SET name = $1, city = $2, address = $3, phone = $4 WHERE id = $5',
    [data.name, data.city, data.address, data.phone, id],
  );
  revalidatePath('/account');
  return {
    status: 200,
    body: 'update address success',
  };
}
