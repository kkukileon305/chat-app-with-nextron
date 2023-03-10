import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../../lib/firebase';
import { UsersResponse, User } from '../../types/response';
import UserItem from '../buttons/UserItem';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const unsubscribe = onValue(ref(database, 'users'), snapshot => {
      const usersResponse = snapshot.val() as UsersResponse;

      if (!usersResponse) return;

      const newUsers = Object.entries(usersResponse).map(([uid, value]) => ({ ...value, uid }));
      setUsers(newUsers);
    });

    return unsubscribe;
  }, []);

  return (
    <div className='w-[200px] p-4'>
      <div>
        <h2 className='font-bold text-xl'>유저 목록</h2>
        <p>클릭하여 1:1 채팅으로 이동합니다.</p>
      </div>
      <ul className='my-4'>
        {users.map(user => (
          <UserItem key={user.uid} user={user} />
        ))}
      </ul>
    </div>
  );
};
export default UserList;
