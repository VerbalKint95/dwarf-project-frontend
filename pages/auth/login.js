import { useState, useContext } from 'react'; // Importer useContext
import { useRouter } from 'next/router';
import { AuthContext } from '../../utils/AuthContext'; // Importer AuthContext
import Link from 'next/link';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useContext(AuthContext); // Obtenir la fonction de login depuis le contexte d'authentification

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password); // Utiliser la fonction de login depuis le contexte d'authentification
      router.push('/forum');
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link href="/auth/register">
        <button>Sign up</button>
      </Link>
    </div>
  );
};

export default Login;
