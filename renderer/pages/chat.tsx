import { useRouter } from 'next/router';
import Back from '../components/buttons/Back';

const chat = () => {
  const router = useRouter();

  return (
    <div className='max-w-[1060px] min-h-screen w-full p-4 '>
      <Back />
      {router.query.key}
    </div>
  );
};
export default chat;
