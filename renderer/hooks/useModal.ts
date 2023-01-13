import { create } from 'zustand';

type ModalStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const useModal = create<ModalStore>(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({ isOpen }),
}));

export default useModal;
