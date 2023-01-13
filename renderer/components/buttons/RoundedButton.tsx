import { ReactNode, MouseEventHandler } from 'react';

type RoundedButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler;
  className?: string;
  disabled?: boolean;
};

const RoundedButton = ({ children, className, disabled, onClick }: RoundedButtonProps) => {
  return (
    <button onClick={onClick} className={`rounded-full bg-gray-600 px-4 py-2 text-white ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};
export default RoundedButton;
