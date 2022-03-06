import { SessionProvider, useSession, signIn } from 'next-auth/react';
import Head from 'next/head';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../styles/globals.css';

const Auth = ({ children, isRequired }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }

  if (isRequired && !session) {
    signIn();
  }

  return children;
};

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>MedicAid</title>
      </Head>
      <Auth isRequired={Component.auth}>
        <Header />
        <Component {...pageProps} />
      </Auth>
    </SessionProvider>
  );
};

export default App;
