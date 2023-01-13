import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import RoundedButton from '../components/buttons/RoundedButton';
import Modal from '../components/Modal';
import Text from '../components/text/Text';
import useModal from '../hooks/useModal';
import useUser from '../hooks/useUser';
import { auth } from '../lib/firebase';

const main = () => {
  const router = useRouter();
  const user = useUser(store => store.user);
  const { isOpen, setIsOpen } = useModal(({ isOpen, setIsOpen }) => ({ isOpen, setIsOpen }));

  const logOut = () => {
    signOut(auth);
    router.push('/login');
  };

  return (
    <>
      {isOpen && <Modal> asd</Modal>}
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
      </div>
    </>
  );
};
export default main;
