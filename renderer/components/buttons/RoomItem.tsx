import Link from 'next/link';
import { ChatRoom } from '../../types/response';

type RoomItemProps = {
  chatRoom: ChatRoom;
};

const RoomItem = ({ chatRoom }: RoomItemProps) => {
  return (
    <li className=''>
      <Link href={`/chat?key=${chatRoom.key}`}>
        <a className='border p-2 flex items-center justify-between'>
          <p className='font-bold'>{chatRoom.name}</p>
          <div>
            <p className='text-right'>{chatRoom.creator}</p>
            <p className='text-right'>{chatRoom.createdAt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};
export default RoomItem;
