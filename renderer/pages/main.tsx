import { signOut } from 'firebase/auth';
import Text from '../components/text/Text';
import useUser from '../hooks/useUser';
import { auth } from '../lib/firebase';

const main = () => {
  const user = useUser(store => store.user);
  return (
    <div>
      <Text>{user?.email ? user.email : 'email'}</Text>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
};
export default main;
