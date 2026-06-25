import { authAction } from '@/actions/users';
import Cart from '@/components/Cart';
export default async function Page() {
  const auth = await authAction();
  return <Cart status={auth.status} />;
}
