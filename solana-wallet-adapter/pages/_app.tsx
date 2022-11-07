import React from 'react';
import dynamic from 'next/dynamic';
import { AppProps } from 'next/app';
require('../styles/globals.css');
require('../styles/Home.Module.css');

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnectionProvider: any = dynamic(
  () => import('../context/WalletConnectionProvider'),
  {
    ssr: false,
  }
);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WalletConnectionProvider>
      <Component {...pageProps} />
    </WalletConnectionProvider>
  );
};

export default App;
