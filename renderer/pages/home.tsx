import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import links from '../lib/links';
import Title from '../components/text/Title';

function Home() {
  return (
    <>
      <Head>
        <title>Chat App</title>
      </Head>

      <Title title='채팅앱' />

      <ul className='flex justify-end gap-2'>
        {links.map(link => (
          <Link key={link.id} href={`/${link.url}`}>
            <a className='px-4 py-2 border border-gray-600 text-gray-600 block text-center w-[100px]'>{link.title}</a>
          </Link>
        ))}
      </ul>
    </>
  );
}

export default Home;
