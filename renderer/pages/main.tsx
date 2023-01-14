import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import RoundedButton from '../components/buttons/RoundedButton';
import CreateRoomModal from '../components/modals/CreateRoomModal';
import Text from '../components/text/Text';
import useModal from '../hooks/useModal';
import useUser from '../hooks/useUser';
import { auth, database } from '../lib/firebase';
import { ChatRoom, ChatRoomsResponse } from '../types/response';
import RoomItem from '../components/buttons/RoomItem';
import Head from 'next/head';

const main = () => {
  const router = useRouter();

  const user = useUser(store => store.user);
  const { isOpen, setIsOpen } = useModal(({ isOpen, setIsOpen }) => ({ isOpen, setIsOpen }));

  const [chatRooms, setChatrooms] = useState<ChatRoom[]>([]);

  const logOut = () => {
    signOut(auth);
    router.push('/login');
  };

  useEffect(() => {
    const unsubscribe = onValue(ref(database, 'rooms'), snapshot => {
      const roomsResponse = snapshot.val() as ChatRoomsResponse;

      const newChatRooms = Object.entries(roomsResponse).map(entry => ({ ...entry[1], key: entry[0] }));
      setChatrooms(newChatRooms);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Head>
        <title>Chat List</title>
      </Head>

      {isOpen && <CreateRoomModal />}

      <div className='max-w-[1060px] min-h-screen w-full p-4'>
        <ul className='border border-black h-[calc(100vh-152px)] overflow-y-auto'>
          {chatRooms.map(chatRoom => (
            <RoomItem key={chatRoom.key} chatRoom={chatRoom} />
          ))}
        </ul>

        <RoundedButton onClick={() => setIsOpen(true)} className='w-full my-4'>
          채팅방 만들기
        </RoundedButton>

        <div className='flex items-center justify-end gap-4'>
          <div className='text-right'>
            <Text>{user?.displayName || '테스트용'}님</Text>
            <Text>{user?.email || '테스트이메일'}</Text>
          </div>
          <RoundedButton onClick={logOut}>로그아웃</RoundedButton>
        </div>
      </div>
    </>
  );
};
export default main;
