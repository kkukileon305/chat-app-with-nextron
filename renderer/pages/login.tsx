import Head from 'next/head';
import Link from 'next/link';

const login = () => {
  return (
    <>
      <Head>
        <title>login</title>
      </Head>
      <div>
        <Link href='/home'>
          <a>back</a>
        </Link>
      </div>
    </>
  );
};
export default login;
