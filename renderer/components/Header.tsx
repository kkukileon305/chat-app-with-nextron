import Link from 'next/link';
import links from '../lib/links';

const Header = () => {
  return (
    <header className='p-4 flex justify-between items-center'>
      <h1 className='font-bold text-2xl'>
        <Link href={'/home'}>
          <a>Home</a>
        </Link>
      </h1>
      <ul className='flex justify-end gap-2'>
        {links.map(link => (
          <Link key={link.id} href={`/${link.url}`}>
            <a className='px-4 py-2 border block text-center'>{link.title}</a>
          </Link>
        ))}
      </ul>
    </header>
  );
};
export default Header;
