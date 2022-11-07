import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import React, {useState} from 'react';

const SendTransaction = () => {
  const [txSig, setTxSig] = useState('');
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const link = () => {
      return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ''
  }
 
  const sendSol = (event: any) => {
    event.preventDefault()
    if (!connection || !publicKey) { return }
    const transaction = new web3.Transaction()
    const recipientPubKey = new web3.PublicKey(event.target.recipient.value)

    const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPubKey,
        lamports: web3.LAMPORTS_PER_SOL * event.target.amount.value
    })

    transaction.add(sendSolInstruction)
    sendTransaction(transaction, connection).then(sig => {
        setTxSig(sig)
    })
}

  return (
    <div
      style={{
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <form>
        <p>Amount of $SOL to send</p>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <input
            name='amount'
            type='text'
            style={{
              width: '14rem',
              height: '2rem',
              padding: '0.4rem',
            }}
            placeholder='Add Recipient Address'
          />
        </div>
        <p>Recipient Address</p>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <input
            name='recipient'
            type='text'
            style={{
              width: '14rem',
              height: '2rem',
              padding: '0.4rem',
            }}
            placeholder='Add Recipient Address'
          />
          <button
            onClick={sendSol}
            style={{
              width: '14rem',
              height: '2rem',
              backgroundColor: 'purple',
              borderRadius: '5px',
              border: '0px',
              padding: '0.4rem',
            }}
          >
            Send Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendTransaction;
