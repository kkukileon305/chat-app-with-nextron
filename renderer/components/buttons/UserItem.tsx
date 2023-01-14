import Link from 'next/link';
import { User } from '../../types/response';

type UserItemProps = {
  user: User;
};

const UserItem = ({ user }: UserItemProps) => {
  return (
    <li className='my-2'>
      <Link href={`/dm?uid=${user.uid}`}>
        <a className='block p-2 bg-gray-500'>
          <p className='font-bold text-white'>{user.displayName}</p>
        </a>
      </Link>
    </li>
  );
};
export default UserItem;
