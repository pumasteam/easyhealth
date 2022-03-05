import { SessionProvider, useSession, signIn } from "next-auth/react";
import "../styles/globals.css";

const Auth = ({ children, isRequired }) => {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );

  if (isRequired && !session) {
    signIn();
  }

  return children;
};

const App = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={session}>
      <Auth isRequired={Component.auth}>
        <Component {...pageProps} />
      </Auth>
    </SessionProvider>
  );
};

export default App;
