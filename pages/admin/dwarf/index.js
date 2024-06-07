import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { isAdmin } from '../../../utils/auth'; 
import api from '../../../utils/api'; // Assurez-vous de bien importer l'API depuis le bon emplacement

const DwarfIndexPage = () => {
  const router = useRouter();
  const [dwarfs, setDwarfs] = useState([]);

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
    // Effectuez une requête GET pour récupérer tous les nains
    const fetchDwarfs = async () => {
      try {
        const response = await api.get('/dwarf');
        setDwarfs(response.data.dwarfResponses); // Accédez à dwarfResponses dans la réponse
      } catch (error) {
        console.error('Failed to fetch dwarfs:', error);
      }
    };

    fetchDwarfs();
  }, []);

  const handleDeleteDwarf = async (dwarfId) => {
    try {
      // Effectuez une requête DELETE pour supprimer le nain avec l'ID spécifié
      await api.delete(`/dwarf/${dwarfId}`);
      // Mettez à jour la liste des nains après la suppression
      setDwarfs(dwarfs.filter((dwarf) => dwarf.id !== dwarfId));
    } catch (error) {
      console.error(`Failed to delete dwarf with ID ${dwarfId}:`, error);
    }
  };

  return (
    <div>
      <h1>Dwarfs</h1>
      <ul>
        {Array.isArray(dwarfs) && dwarfs.map((dwarf) => (
          <li key={dwarf.id}>
            {dwarf.name}
            <button onClick={() => handleDeleteDwarf(dwarf.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link href="/admin/dwarf/add">
        <button>Add Dwarf</button>
      </Link>
    </div>
  );
};

export default DwarfIndexPage;
