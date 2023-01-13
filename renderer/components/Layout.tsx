import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <main className='p-4 min-h-screen flex flex-col justify-center items-center'>{children}</main>;
};
export default Layout;
