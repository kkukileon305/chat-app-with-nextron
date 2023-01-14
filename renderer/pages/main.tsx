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
      {isOpen && <CreateRoomModal />}

      <div className='max-w-[1060px] min-h-screen w-full p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <Text>{user?.displayName || '테스트용'}님</Text>
            <Text>{user?.email || '테스트이메일'}</Text>
          </div>
          <RoundedButton onClick={logOut}>로그아웃</RoundedButton>
        </div>
        <RoundedButton onClick={() => setIsOpen(true)} className='w-full my-4'>
          채팅방 만들기
        </RoundedButton>
        <ul>
          {chatRooms.map(chatRoom => (
            <li key={chatRoom.key}>
              <p>{chatRoom.name}</p>
              <p>{chatRoom.creator}</p>
              <p>{chatRoom.createdAt}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default main;
