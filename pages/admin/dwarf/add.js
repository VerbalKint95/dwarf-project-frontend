import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../../utils/api';
import { isAdmin } from '../../../utils/auth'; 

const AddDwarfPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [health, setHealth] = useState(0);
  const [strength, setStrength] = useState(0);
  const [agility, setAgility] = useState(0);
  const [stamina, setStamina] = useState(0);
  const [highAtk, setHighAtk] = useState(0);
  const [lowAtk, setLowAtk] = useState(0);
  const [highDef, setHighDef] = useState(0);
  const [lowDef, setLowDef] = useState(0);
  const [atkSpe, setAtkSpe] = useState('');
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/dwarf', {
        name,
        bio,
        health,
        strength,
        agility,
        stamina,
        highAtk,
        lowAtk,
        highDef,
        lowDef,
        atkSpe,
      });
      router.push('/admin');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Add Dwarf</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        ></textarea>
        <label>Health:</label>
        <input
          type="number"
          value={health}
          onChange={(e) => setHealth(e.target.value)}
          required
        />
        <label>Strength:</label>
        <input
          type="number"
          value={strength}
          onChange={(e) => setStrength(e.target.value)}
          required
        />
        <label>Agility:</label>
        <input
          type="number"
          value={agility}
          onChange={(e) => setAgility(e.target.value)}
          required
        />
        <label>Stamina:</label>
        <input
          type="number"
          value={stamina}
          onChange={(e) => setStamina(e.target.value)}
          required
        />
        <label>High Attack:</label>
        <input
          type="number"
          value={highAtk}
          onChange={(e) => setHighAtk(e.target.value)}
          required
        />
        <label>Low Attack:</label>
        <input
          type="number"
          value={lowAtk}
          onChange={(e) => setLowAtk(e.target.value)}
          required
        />
        <label>High Defense:</label>
        <input
          type="number"
          value={highDef}
          onChange={(e) => setHighDef(e.target.value)}
          required
        />
        <label>Low Defense:</label>
        <input
          type="number"
          value={lowDef}
          onChange={(e) => setLowDef(e.target.value)}
          required
        />
        <label>Attack Specialization:</label>
        <select value={atkSpe} onChange={(e) => setAtkSpe(e.target.value)} required>
          <option value="">Select Attack Specialization</option>
          <option value="THEMEGAPUNCH">The Mega Punch</option>
          <option value="THEABOMINABLESUBMISSION">The Abominable Submission</option>
          <option value="THEFORBIDENSPLINTER">The Forbidden Splinter</option>
        </select>
        <button type="submit">Add Dwarf</button>
      </form>
    </div>
  );
};

export default AddDwarfPage;
