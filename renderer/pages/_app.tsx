import React from 'react';
import type { AppProps } from 'next/app';
import useAuth from '../hooks/useAuth';
import Layout from '../components/Layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useAuth();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
