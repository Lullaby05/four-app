import Sort from '@/components/Sort';
import Products from '@/components/Products';
import { productsAction } from '@/actions/products';

export default async function Page() {
  const { data } = await productsAction();
  return (
    <div className="container flex py-6">
      <Sort />
      <Products data={data} />
    </div>
  );
}
