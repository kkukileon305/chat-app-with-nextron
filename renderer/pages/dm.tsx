import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { get, push, ref } from 'firebase/database';
import { useForm } from 'react-hook-form';
import Back from '../components/buttons/Back';
import useUser from '../hooks/useUser';
import { database } from '../lib/firebase';
import { User, UserResponse } from '../types/response';
import { krIntl } from '../lib/formatter';

type DmInputs = {
  message: string;
};

const dm = () => {
  const router = useRouter();
  const user = useUser(store => store.user);

  const [targetUser, setTargetUser] = useState<User | null>(null);
  const uids = useMemo(() => [router.query.uid as string, user?.uid].sort().join('_'), [router.query.uid]);

  const { register, handleSubmit } = useForm<DmInputs>();

  useEffect(() => {
    get(ref(database, `users/${router.query.uid}`)).then(snapshot => {
      const userResponse = snapshot.val() as UserResponse;
      const user = { ...userResponse, uid: router.query.uid as string };

      setTargetUser(user);
    });
  }, []);

  const onSubmit = async ({ message }: DmInputs) => {
    if (!user) return;

    push(ref(database, `directMessages/${uids}`), {
      message,
      createdAt: krIntl.format(new Date()),
      displayName: user.displayName,
    });
  };

  return (
    <div className='max-w-[1060px] min-h-screen w-full p-4 '>
      <div className='flex items-center gap-4 mb-4'>
        <Back />
        <p>{targetUser ? targetUser.displayName : '불러오는 중'}</p>
      </div>
      <div className='h-[calc(100vh-88px)] bg-gray-500 rounded-xl overflow-hidden p-4'>
        <ul className=''></ul>
        <form className='flex p-4 bg-gray-400 rounded-xl' onSubmit={handleSubmit(onSubmit)}>
          <input className='bg-transparent block w-[calc(100%-60px)] placeholder:text-gray-600' placeholder='메세지 입력하기...' type='text' {...register('message', { required: true })} />
          <button className='w-[60px] border border-black'>보내기</button>
        </form>
      </div>
    </div>
  );
};
export default dm;
