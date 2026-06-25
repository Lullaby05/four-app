'use client';

import { Product } from '@/types/global';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Button } from './ui/button';
import { useState } from 'react';
import { useCartStore } from '@/store';

export default function AddCart({ product }: { product: Product }) {
  const [value, setValue] = useState<string>('');
  const { cartList, isItemInCart, addToCart, updateQuantity } = useCartStore();
  const handleValueChange = (value: string[]) => {
    setValue(value[0]);
  };
  const handleClick = () => {
    const index = isItemInCart(product.name, value);
    if (index < 0) {
      addToCart({
        product,
        quantity: 1,
        selectedVariant: value,
      });
    } else {
      updateQuantity(index, cartList[index].quantity + 1);
    }
  };
  return (
    <div className="w-80 py-12">
      <h3>Select</h3>
      <ToggleGroup
        className="justify-start py-6 border-b mb-6"
        variant="outline"
        onValueChange={handleValueChange}
      >
        {product.variant.map((item) => (
          <ToggleGroupItem
            className="px-4 bg-slate-50 mr-3"
            key={item}
            value={item}
          >
            {item}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <h3>Price</h3>
      <p className="text-2xl font-bold text-red-400 mb-6">${product.price}</p>
      <Button
        disabled={value ? false : true}
        onClick={handleClick}
      >
        Add to Cart
      </Button>
    </div>
  );
}
