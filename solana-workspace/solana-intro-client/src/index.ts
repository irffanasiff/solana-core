import * as Web3 from '@solana/web3.js';
import * as fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const PROGRAM_ID = new Web3.PublicKey(
  'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'
);
const PROGRAM_DATA_PUBLIC_KEY = new Web3.PublicKey(
  'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'
);

async function main() {
  const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
  const signer = await initializeKeypair(connection);
  const recipient = Web3.Keypair.generate();

  // await airdropSolIfNeeded(signer, connection);

  // await pingProgram(connection, signer);
  await transferSol(connection, signer, recipient);

  console.log('Public key:', signer.publicKey.toBase58());
}

main()
  .then(() => {
    console.log('Finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

async function initializeKeypair(
  connection: Web3.Connection
): Promise<Web3.Keypair> {
  if (!process.env.PRIVATE_KEY) {
    console.log('Generating new keypair... 🗝️');
    const signer = Web3.Keypair.generate();

    console.log('Creating .env file');
    fs.writeFileSync('.env', `PRIVATE_KEY=[${signer.secretKey.toString()}]`);

    return signer;
  }

  const secret = JSON.parse(process.env.PRIVATE_KEY ?? '') as number[];
  const secretKey = Uint8Array.from(secret);
  const keypairFromSecret = Web3.Keypair.fromSecretKey(secretKey);
  return keypairFromSecret;
}

async function airdropSolIfNeeded(
  signer: Web3.Keypair,
  connection: Web3.Connection
) {
  const balance = await connection.getBalance(signer.publicKey);
  console.log('Current balance is', balance / Web3.LAMPORTS_PER_SOL, 'SOL');

  // 1 SOL should be enough for almost anything you wanna do
  if (balance / Web3.LAMPORTS_PER_SOL < 1) {
    // You can only get up to 2 SOL per request
    console.log('Airdropping 1 SOL');
    const airdropSignature = await connection.requestAirdrop(
      signer.publicKey,
      Web3.LAMPORTS_PER_SOL
    );

    const latestBlockhash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      signature: airdropSignature,
    });

    const newBalance = await connection.getBalance(signer.publicKey);
    console.log('New balance is', newBalance / Web3.LAMPORTS_PER_SOL, 'SOL');
  }
}

async function pingProgram(connection: Web3.Connection, payer: Web3.Keypair) {
  const transaction = new Web3.Transaction();
  const instruction = new Web3.TransactionInstruction({
    // Instructions need 3 things

    // 1. The public keys of all the accounts the instruction will read/write
    // it's an array of account metadata for each account that this instruction will read from or write to.
    keys: [
      {
        pubkey: PROGRAM_DATA_PUBLIC_KEY,
        isSigner: false, // this write doesn't require a signature from the data account
        isWritable: true, // isWritable is true cause the account is being written to!
      },
    ],

    // 2. The ID of the program this instruction will be sent to
    programId: PROGRAM_ID,

    // 3. Data - in this case, there's none!
  });

  transaction.add(instruction);
  const transactionSignature = await Web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
  );

  console.log(
    `Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  );
}

async function transferSol(
  connection: Web3.Connection,
  payer: Web3.Keypair,
  recipient: Web3.Keypair
) {
  // 1. Create a transaction
  const transaction = new Web3.Transaction();

  // 2. Add a transfer instruction
  const transferInstruction = Web3.SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: recipient.publicKey,
    lamports: 500000000, // 0.5 SOL
  });

  // 3. Add the instruction to the transaction
  transaction.add(transferInstruction);

  // 4. Sign the transaction
  const transactionSignature = await Web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
  );

  console.log(
    `Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  );
}

// solution
async function sendSol(
  connection: Web3.Connection,
  amount: number,
  to: Web3.PublicKey,
  sender: Web3.Keypair
) {
  const transaction = new Web3.Transaction();

  const sendSolInstruction = Web3.SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: to,
    lamports: amount,
  });

  transaction.add(sendSolInstruction);

  const sig = await Web3.sendAndConfirmTransaction(connection, transaction, [
    sender,
  ]);
  console.log(
    `You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${sig}?cluster=devnet`
  );
}
