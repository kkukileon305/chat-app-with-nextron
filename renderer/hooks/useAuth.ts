import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '../lib/firebase';
import useUser from './useUser';

const useAuth = () => {
  const setUser = useUser(store => store.setUser);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        router.push('/main');
      } else {
        setUser(null);
        router.push('/login');
      }
    });
  }, []);
};

export default useAuth;
