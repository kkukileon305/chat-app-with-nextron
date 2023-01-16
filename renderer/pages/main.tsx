import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { signOut } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import RoundedButton from '../components/buttons/RoundedButton';
import CreateRoomModal from '../components/modals/CreateRoomModal';
import Text from '../components/text/Text';
import RoomItem from '../components/buttons/RoomItem';
import UserList from '../components/panels/UserList';
import useModal from '../hooks/useModal';
import useUser from '../hooks/useUser';
import { auth, database } from '../lib/firebase';
import { ChatRoom, ChatRoomsResponse } from '../types/response';

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

      if (!roomsResponse) return;

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

      <div className='max-w-[1060px] min-h-screen w-full flex gap-4'>
        <UserList />
        <div className='w-[calc(100%-216px)] p-4'>
          <div className='flex items-center gap-4 mb-4'>
            <h2 className='font-bold text-xl'>채팅 목록</h2>
            <p>원하는 방을 클릭하여 그룹 채팅으로 이동합니다.</p>
          </div>
          <ul className='h-[calc(100vh-228px)] overflow-y-auto'>
            {chatRooms.map(chatRoom => (
              <RoomItem key={chatRoom.key} chatRoom={chatRoom} />
            ))}
          </ul>
          <RoundedButton onClick={() => setIsOpen(true)} className='w-full my-4'>
            채팅방 만들기
          </RoundedButton>
          <div className='flex items-center justify-end gap-4'>
            <div className='text-right'>
              <Text>{user?.displayName}님</Text>
              <Text>{user?.email}</Text>
            </div>
            <RoundedButton onClick={logOut}>로그아웃</RoundedButton>
          </div>
        </div>
      </div>
    </>
  );
};
export default main;
