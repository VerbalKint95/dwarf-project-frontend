// pages/_app.js

import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { AuthProvider } from '../utils/AuthContext';

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <AuthProvider>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default MyApp;
