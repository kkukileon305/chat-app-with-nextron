import { User } from 'firebase/auth';
import { create } from 'zustand';

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useUser = create<UserStore>(set => ({
  user: null,
  setUser: user => set({ user }),
}));

export default useUser;
