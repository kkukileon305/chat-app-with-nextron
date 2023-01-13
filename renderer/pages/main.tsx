import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import Text from '../components/text/Text';
import useUser from '../hooks/useUser';
import { auth } from '../lib/firebase';

const main = () => {
  const router = useRouter();
  const user = useUser(store => store.user);

  const logOut = () => {
    signOut(auth);
    router.push('/login');
  };

  return (
    <div>
      <Text>{user?.displayName}</Text>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};
export default main;
