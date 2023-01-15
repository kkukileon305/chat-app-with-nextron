import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { get, ref } from 'firebase/database';
import { useForm } from 'react-hook-form';
import Back from '../components/buttons/Back';
import useUser from '../hooks/useUser';
import { database } from '../lib/firebase';
import { User, UserResponse, UsersResponse } from '../types/response';

type DmInputs = {
  message: string;
};

const dm = () => {
  const router = useRouter();
  const user = useUser(store => store.user);
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const uids = useMemo(() => [router.query.uid as string, user.uid].sort().join('_'), [router.query.uid]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DmInputs>();

  useEffect(() => {
    get(ref(database, `users/${router.query.uid}`)).then(snapshot => {
      const userResponse = snapshot.val() as UserResponse;
      const user = { ...userResponse, uid: router.query.uid as string };

      setTargetUser(user);
    });
  }, []);

  return (
    <div className='max-w-[1060px] min-h-screen w-full p-4 '>
      <div>
        <Back />
        <p>{targetUser ? targetUser.uid : '불러오는 중'}</p>
      </div>
    </div>
  );
};
export default dm;
