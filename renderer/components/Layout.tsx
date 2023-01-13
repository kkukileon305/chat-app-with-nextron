import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <main className='min-h-screen flex flex-col justify-center items-center'>{children}</main>;
};
export default Layout;
