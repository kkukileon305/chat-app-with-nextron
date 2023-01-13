import { MouseEventHandler, ReactNode } from 'react';

type SquareButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler;
  className?: string;
  disabled?: boolean;
};

const SquareButton = ({ children, onClick, className, disabled }: SquareButtonProps) => {
  return (
    <button disabled={disabled} className={`w-full bg-gray-700  py-2 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
export default SquareButton;
