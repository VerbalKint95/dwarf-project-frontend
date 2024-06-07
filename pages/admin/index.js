import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isAuthenticated, getUserRole } from '../../utils/auth';

const AdminIndexPage = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur est un administrateur lors du montage de la page
    const checkAdmin = async () => {
      const isAdminUser = await isAdmin();
      if (!isAdminUser) {
        // Redirige l'utilisateur vers une page d'erreur ou une autre page appropriée
        router.push('/auth/login'); // Redirige vers la page d'accueil par exemple
      }
    };

    checkAdmin();
  }, []);

  useEffect(() => {
    const role = getUserRole();
    if (!isAuthenticated() || role === 'ADMIN') {
      router.push('/auth/login');
    } else {
      setIsAdmin(true);
    }
  }, []);

  const handleNavigateToDwarfsPage = () => {
    router.push('/admin/dwarf');
  };

  return (
    <div>
      {isAdmin && (
        <button onClick={handleNavigateToDwarfsPage}>
          Manage Dwarfs
        </button>
      )}
      {!isAdmin && <p>You are not authorized to access this page.</p>}
    </div>
  );
};

export default AdminIndexPage;
