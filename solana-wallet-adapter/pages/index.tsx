import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { AppBar } from '../components/AppBar';
import { PingButton } from '../components/PingButton';
import SendTransaction from '../components/SendTransaction'

export default function Home() {
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta name='description' content='Wallet-Adapter Example' />
      </Head>
      <AppBar />
      <div className={styles.AppBody}>
         <PingButton /> 
         <SendTransaction />
      </div>
    </div>
  );
}
