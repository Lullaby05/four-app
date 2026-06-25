import { productAction, productsAction } from '@/actions/products';
import Image from 'next/image';
import AddCart from '@/components/AddCart';

export async function generateStaticParams() {
  const result = await productsAction();
  return result.data.map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: product } = await productAction(Number(id));
  return (
    <div className="container flex py-6">
      <div className="w-64">
        <h2 className="font-sans text-3xl leading-10 font-bold my-8">
          {product.name}
        </h2>
        <p className="leading-10">{product.description}</p>
      </div>
      <div className="h-125 flex-1 mx-10 bg-slate-50 p-4 rounded-lg shadow-md relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="300"
          priority
          style={{ objectFit: 'contain' }}
        />
      </div>
      <AddCart product={product} />
    </div>
  );
}
