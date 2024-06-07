// components/Header.js

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext} from '../utils/AuthContext';
import { useRouter } from 'next/router';


const Header = () => {
  const { isAuth, isUserAdmin, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <header>
      <nav>
        <Link href="/forum">Forum</Link>
        <Link href="/fight">Fight Simulator</Link>
        {isUserAdmin && (
          <Link href="/admin">Admin Control Panel</Link>
        )}
        {isAuth ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
