import { useState, useContext } from 'react'; // Importer useContext
import { useRouter } from 'next/router';
import { AuthContext } from '../../utils/AuthContext'; // Importer AuthContext

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { register } = useContext(AuthContext); // Obtenir la fonction d'enregistrement depuis le contexte d'authentification

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password); // Utiliser la fonction d'enregistrement depuis le contexte d'authentification
      router.push('/forum');
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
