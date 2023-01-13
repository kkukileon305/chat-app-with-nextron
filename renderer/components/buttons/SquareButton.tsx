import { MouseEventHandler, ReactNode } from 'react';

type SquareButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler;
  className?: string;
};

const SquareButton = ({ children, onClick, className }: SquareButtonProps) => {
  return (
    <button className={`w-full bg-gray-700  py-2 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
export default SquareButton;
