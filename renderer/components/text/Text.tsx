import { ReactNode } from 'react';

type TextProps = {
  children: ReactNode;
};

const Text = ({ children }: TextProps) => {
  return <p className='text-gray-800'>{children}</p>;
};
export default Text;
