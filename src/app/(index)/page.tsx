import Sort from '@/components/Sort';
import Products from '@/components/Products';
import { productionAction } from '@/actions/product';

export default async function Page() {
  const { data } = await productionAction();
  return (
    <div className="container flex py-6">
      <Sort />
      <Products data={data} />
    </div>
  );
}
