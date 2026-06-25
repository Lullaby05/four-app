'use client';
import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store';

export default function Cart({ status }: { status: number }) {
  const { cartList, removeFromCart, updateQuantity } = useCartStore();
  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <div className="container">
      {cartList.length ? (
        <div className="py-24 px-2 flex">
          <div className="flex-1 mr-14">
            <h2 className="text-2xl font-bold">Cart</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-100">Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartList.map((cardItem, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center">
                        <Image
                          src={cardItem.product.image}
                          alt={cardItem.product.name}
                          width={64}
                          height={64}
                          priority
                          style={{
                            width: '64px',
                            height: '64px',
                            objectFit: 'contain',
                          }}
                        />
                        <div className="ml-4 space-y-3">
                          <p className="text-sm font-medium">
                            {cardItem.product.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {cardItem.selectedVariant}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Trash2
                          className="mr-2"
                          color="gray"
                          cursor="pointer"
                          onClick={() => removeFromCart(i)}
                        ></Trash2>
                        <Select
                          value={cardItem.quantity.toString()}
                          onValueChange={(value: string | null) =>
                            updateQuantity(i, Number(value))
                          }
                        >
                          <SelectTrigger className="w-14">
                            <SelectValue></SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {quantityOptions.map((quantity, i) => (
                              <SelectItem
                                key={i}
                                value={quantity.toString()}
                              >
                                {quantity}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell>${cardItem.product.price}</TableCell>
                    <TableCell className="text-right">
                      ${cardItem.product.price * cardItem.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="w-56">
            <h2 className="font-sans font-medium flex flex-row text-2xl mb-6">
              Total
            </h2>
            <p className="text-2xl font-bold text-red-400 mb-6">
              $
              {cartList
                .reduce(
                  (acc, cartItem) =>
                    acc + cartItem.product.price * cartItem.quantity,
                  0,
                )
                .toFixed(2)}
            </p>
            {status === 200 ? (
              <Link href="/checkout">
                <Button className="w-full">Checkout</Button>
              </Link>
            ) : (
              <>
                <Link href="/account">
                  <Button className="w-full">Login</Button>
                </Link>
                <p className="text-sm text-slate-500 text-center mt-1">
                  You need to login to checkout
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="py-48 px-2">
          <h2 className="text-2xl font-bold">Cart</h2>
          <p className="text-sm w-100 mb-6 mt-4">
            You don&apos;t have any items in your cart.Let&apos;s Change that,
            use the link below to start browsing our products.
          </p>
          <div className="flex text-sm items-center underline text-orange-400">
            <Link href="/">Start Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
}
