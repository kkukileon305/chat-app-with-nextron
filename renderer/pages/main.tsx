import { signOut } from 'firebase/auth';
import Text from '../components/text/Text';
import { auth } from '../lib/firebase';

const main = () => {
  return (
    <div>
      <Text>main</Text>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
};
export default main;
