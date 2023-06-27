import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, writeBatch } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { FetchProvider } from '@firebase/auth/internal'
import * as fetchImpl from 'node-fetch';

const firebaseConfig = {
  // Please set your own config
}

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
FetchProvider.initialize(
  fetchImpl.default as unknown as typeof fetch,
  fetchImpl.Headers as unknown as typeof Headers,
  fetchImpl.Response as unknown as typeof Response
);

const signIn = async () => {
  const auth = getAuth();
  await signInAnonymously(auth);
}

const main = async () => {
  await signIn();

  const collectionRef = collection(firestore, 'test');

  const batch = writeBatch(firestore);

  // 500 will succeed, but 501 will fail
  for (const i = 0; i < 501; i++) {
    batch.set(doc(collectionRef), {name: 'test'});
  }
  await batch.commit();

  console.log('batch commit succeeded');
  process.exit(0);
}

main();
