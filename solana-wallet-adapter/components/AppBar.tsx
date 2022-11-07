import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const AppBar = () => {
  return (
    <div className={styles.AppHeader}>
      <Image alt='solana logo' src='/solanaLogo.png' height={30} width={200} />
      <span>Wallet-Adapter Example</span>
      <WalletMultiButton />
    </div>
  );
};
