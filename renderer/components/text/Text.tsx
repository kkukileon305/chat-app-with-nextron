import { ReactNode } from 'react';

type TextProps = {
  children: ReactNode;
  className?: string;
};

const Text = ({ children, className }: TextProps) => {
  return <p className={`text-gray-800 ${className}`}>{children}</p>;
};
export default Text;
