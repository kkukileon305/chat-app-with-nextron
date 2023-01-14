import { MouseEventHandler, ReactNode } from 'react';
import useModal from '../../hooks/useModal';

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const setIsOpen = useModal(store => store.setIsOpen);

  const onClick: MouseEventHandler = ({ target }) => {
    if (target instanceof Element && !target.closest('#container')) {
      setIsOpen(false);
    }
  };

  return (
    <div className='fixed w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center' onClick={onClick}>
      <div id='container' className='max-w-[600px] min-w-[280px] w-full p-4 bg-white rounded-2xl'>
        {children}
      </div>
    </div>
  );
};
export default Modal;
