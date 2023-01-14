import { useRouter } from 'next/router';

const Back = () => {
  const router = useRouter();

  return (
    <button className='bg-gray-500 text-white font-bold px-4 py-2 rounded-full' onClick={() => router.push('/main')}>
      Back
    </button>
  );
};
export default Back;
