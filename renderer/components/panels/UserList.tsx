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

      const newUsers = Object.entries(usersResponse).map(entry => ({ ...entry[1], uid: entry[0] }));
      setUsers(newUsers);
    });

    return unsubscribe;
  }, []);

  return (
    <div className='w-[200px] p-4'>
      <h2 className='font-bold text-xl'>유저 목록</h2>
      <ul className='my-4'>
        {users.map(user => (
          <UserItem key={user.uid} user={user} />
        ))}
      </ul>
    </div>
  );
};
export default UserList;
