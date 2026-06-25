import NotAccount from '@/components/NotAccount';
import Account from '@/components/Account';
import { authAction } from '@/actions/users';
import { addressAction } from '@/actions/address';
export default async function Page() {
  const auth = await authAction();
  const addresses = await addressAction(auth.data?.userId);
  return (
    <>
      {auth.status === 200 && auth.data ? (
        <Account
          authData={auth.data}
          addresses={addresses.data}
        />
      ) : (
        <NotAccount />
      )}
    </>
  );
}
