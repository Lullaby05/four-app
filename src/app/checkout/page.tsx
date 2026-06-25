import { authAction } from '@/actions/users';
import { redirect } from 'next/navigation';
import Checkout from '@/components/Checkout';
import { addressAction } from '@/actions/address';

export default async function Page() {
  const auth = await authAction();
  const addresses = await addressAction(auth.data?.userId);
  if (auth.status !== 200) {
    redirect('/account');
  }
  return (
    <div className="container">
      <Checkout addressData={addresses.data} />
    </div>
  );
}
