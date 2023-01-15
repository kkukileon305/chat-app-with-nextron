import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { get, onValue, push, ref } from 'firebase/database';
import { useForm } from 'react-hook-form';
import Back from '../components/buttons/Back';
import useUser from '../hooks/useUser';
import { database } from '../lib/firebase';
import { MessageType, MessageResponse, User, UserResponse } from '../types/response';
import { krIntl } from '../lib/formatter';
import Message from '../components/text/Message';

type DmInputs = {
  message: string;
};

const dm = () => {
  const router = useRouter();
  const user = useUser(store => store.user);
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const uids = useMemo(() => [router.query.uid as string, user?.uid].sort().join('_'), [router.query.uid]);
  const { register, handleSubmit } = useForm<DmInputs>();
  const { ref: inputRefForForm, ...rest } = register('message', { required: true });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    get(ref(database, `users/${router.query.uid}`)).then(snapshot => {
      const userResponse = snapshot.val() as UserResponse;
      const user = { ...userResponse, uid: router.query.uid as string };

      setTargetUser(user);
    });

    return onValue(ref(database, `directMessages/${uids}`), snapshot => {
      const messageResponse = snapshot.val() as MessageResponse;

      if (!messageResponse) return;

      const messages = Object.entries(messageResponse).map(entry => ({ key: entry[0], ...entry[1] }));
      setMessages(messages);
    });
  }, []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      block: 'end',
    });
  }, [messages]);

  const onSubmit = async ({ message }: DmInputs) => {
    if (!user || !inputRef.current) return;

    inputRef.current.value = '';
    await push(ref(database, `directMessages/${uids}`), {
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
      <div className='h-[calc(100vh-88px)] bg-gray-700 rounded-xl overflow-hidden p-4'>
        <ul className='h-[calc(100%-74px)] mb-4 overflow-y-auto'>
          {messages.map((message, index) => (
            <Message ref={index === messages.length - 1 ? lastMessageRef : null} key={message.key} message={message} />
          ))}
        </ul>
        <form className='flex p-4 bg-gray-400 rounded-xl' onSubmit={handleSubmit(onSubmit)}>
          <input
            className='bg-transparent block w-[calc(100%-60px)] placeholder:text-gray-600'
            placeholder='메세지 입력하기...'
            type='text'
            {...rest}
            ref={e => {
              inputRef.current = e;
              inputRefForForm(e);
            }}
          />
          <button className='w-[60px] border border-black'>보내기</button>
        </form>
      </div>
    </div>
  );
};
export default dm;
