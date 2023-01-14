import { MouseEventHandler, ReactNode } from 'react';

type SquareButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler;
  className?: string;
  disabled?: boolean;
};

const SquareButton = ({ children, onClick, className, disabled }: SquareButtonProps) => {
  return (
    <button disabled={disabled} className={`bg-gray-700 text-white py-2 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
export default SquareButton;
