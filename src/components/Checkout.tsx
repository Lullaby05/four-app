'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Address } from '@/types/global';
import { useCartStore } from '@/store';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { MapPin, CreditCard, CheckCircle2, Plus } from 'lucide-react';

export default function Checkout({
  addressData = [],
}: {
  addressData: Address[];
}) {
  const { cartList } = useCartStore();
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    addressData.length > 0 ? addressData[0].id : null,
  );

  // 计算购物车总额
  const subtotal = cartList.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      toast.error('Please select a shipping address');
      return;
    }
    const selectedAddress = addressData.find(
      (addr) => addr.id === selectedAddressId,
    );
    console.log('Order creation validated. Target payload:', {
      address: selectedAddress,
      items: cartList,
      total: subtotal,
      paymentMethod: 'Cash on Delivery',
    });
    // 提示用户验证成功并可在控制台查看，便于后续对接数据库
    toast.success(
      '订单信息验证通过！后续数据库对接逻辑可直接在 Checkout.tsx 的 handlePlaceOrder 中编写。',
    );
  };

  return (
    <div className="py-10 w-full mx-auto px-4">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      {cartList.length === 0 ? (
        <div className="border rounded-lg p-12 text-center text-slate-500 bg-white shadow-sm">
          <p className="mb-4">
            Your cart is empty. Please add items to checkout.
          </p>
          <Link href="/">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* 左侧大栏：收货地址与支付方式 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 第一部分：收货地址选择 */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <MapPin className="size-5 text-primary" />
                  1. Shipping Address
                </h2>
                <Link href="/account">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs flex items-center gap-1"
                  >
                    <Plus className="size-3" /> Manage Addresses
                  </Button>
                </Link>
              </div>

              {addressData.length === 0 ? (
                <div className="border border-dashed rounded-lg p-6 text-center text-slate-500">
                  <p className="text-sm mb-3">
                    No addresses found. You must add a shipping address to
                    proceed.
                  </p>
                  <Link href="/account">
                    <Button size="sm">Go to Add Address</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addressData.map((address) => {
                    const isSelected = selectedAddressId === address.id;
                    return (
                      <div
                        key={address.id}
                        onClick={() => setSelectedAddressId(address.id)}
                        className={`border rounded-lg p-4 relative cursor-pointer transition-all duration-200 hover:border-primary/50 bg-slate-50/50 ${
                          isSelected
                            ? 'border-primary ring-2 ring-primary/20 bg-white'
                            : 'border-slate-200'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-semibold text-slate-800 text-sm mb-2">
                            {address.name}
                          </p>
                          {isSelected && (
                            <CheckCircle2 className="size-4 text-primary shrink-0" />
                          )}
                        </div>
                        <div className="text-xs text-slate-500 space-y-1">
                          <p>{address.city}</p>
                          <p>{address.address}</p>
                          <p className="pt-1 font-mono text-slate-600">
                            {address.phone}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 第三部分：支付方式 */}
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                <CreditCard className="size-5 text-primary" />
                2. Payment Method
              </h2>
              <div className="border border-primary rounded-lg p-4 bg-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-4 rounded-full border-4 border-primary bg-white shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-slate-500">
                      Pay with cash when your package is delivered.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  Default
                </span>
              </div>
            </div>
          </div>

          {/* 右侧小栏：订单摘要 (第二部分) */}
          <div className="border rounded-lg p-6 bg-white shadow-sm space-y-6">
            <h2 className="text-lg font-bold">3. Order Review</h2>

            {/* 购物车数据表格 */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Item</TableHead>
                    <TableHead className="text-center text-xs">Qty</TableHead>
                    <TableHead className="text-right text-xs">Price</TableHead>
                    <TableHead className="text-right text-xs">
                      Subtotal
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartList.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="py-3 pl-0">
                        <div className="flex items-center gap-2">
                          <div className="relative size-10 shrink-0 border rounded bg-slate-50 p-1 flex items-center justify-center">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              width={36}
                              height={36}
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-800 truncate max-w-[100px]">
                              {item.product.name}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate max-w-[100px]">
                              {item.selectedVariant}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-xs py-3">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right text-xs py-3">
                        ${item.product.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-xs py-3">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* 最底下的 total */}
                  <TableRow className="font-bold border-t bg-slate-50/50 hover:bg-slate-50/50">
                    <TableCell
                      colSpan={3}
                      className="py-4 text-sm text-slate-700"
                    >
                      Total
                    </TableCell>
                    <TableCell className="text-right py-4 text-sm text-primary">
                      ${subtotal.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* 下单按钮 */}
            <Button
              onClick={handlePlaceOrder}
              disabled={!selectedAddressId}
              className="w-full py-6 text-base font-semibold shadow-md transition-all duration-200"
            >
              Place Order (${subtotal.toFixed(2)})
            </Button>

            {!selectedAddressId && (
              <p className="text-xs text-red-500 text-center mt-2">
                * Please select a shipping address before placing order.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
