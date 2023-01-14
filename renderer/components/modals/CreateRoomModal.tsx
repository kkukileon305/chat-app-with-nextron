import { useForm } from 'react-hook-form';
import { push, ref } from 'firebase/database';
import { database } from '../../lib/firebase';
import RoundedButton from '../buttons/RoundedButton';
import Modal from './Modal';
import useUser from '../../hooks/useUser';
import useModal from '../../hooks/useModal';
import { useRef, useState } from 'react';

type RoomInputs = {
  name: string;
};

const CreateRoomModal = () => {
  const user = useUser(store => store.user);
  const setIsOpen = useModal(store => store.setIsOpen);

  const [disabed, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RoomInputs>();

  const onSubmit = async ({ name }: RoomInputs) => {
    if (!user) return;

    const krIntl = new Intl.DateTimeFormat('ko', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });

    try {
      setDisabled(true);
      await push(ref(database, `rooms`), {
        name,
        creator: user.displayName,
        creatorEmail: user.email,
        createdAt: krIntl.format(new Date()),
      });

      setIsOpen(false);
    } catch (error) {
      setError('name', {
        message: '생성실패',
      });
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Modal>
      <h2 className='font-bold text-xl text-center'>방 이름</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='my-2 relative'>
          <input //
            type='text'
            className='border p-2 w-full focus:outline-none'
            placeholder='입력해주세요...'
            {...register('name', { required: true, minLength: 2 })}
          />
          {errors.name && <p className='absolute top-[calc(50%-12px)] right-2 text-red-500'>2글자 이상이여야합니다.</p>}
        </div>
        <RoundedButton disabled={disabed} className='w-full'>
          {disabed ? '생성중...' : '만들기'}
        </RoundedButton>
      </form>
    </Modal>
  );
};
export default CreateRoomModal;
