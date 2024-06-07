import withAuth from '../../utils/withAuth';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

const FightSimulator = () => {
  const [dwarfs, setDwarfs] = useState([]);
  const [dwarf1, setDwarf1] = useState('');
  const [dwarf2, setDwarf2] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchDwarfs = async () => {
      const response = await api.get('/dwarf');
      setDwarfs(response.data.dwarfResponses);
    };

    fetchDwarfs();
  }, []);

  const handleFight = async () => {
    if (!dwarf1 || !dwarf2) {
      alert('Please select both Dwarf 1 and Dwarf 2 for the fight.');
      return;
    }
    const response = await api.post('/fight', {
      nbOfRound: 3,
      dwarf1Id: parseInt(dwarf1),
      dwarf2Id: parseInt(dwarf2),
    });
    setResult(response.data);
  };

  return (
    <div>
      <h1>Fight Simulator</h1>
      <select onChange={(e) => setDwarf1(e.target.value)}>
        <option key="default" value="">Select Dwarf 1</option>
        {dwarfs.map((dwarf, index) => (
          <option key={`dwarf1_${index}`} value={dwarf.id}>
            {dwarf.name}
          </option>
        ))}
      </select>
      VS
      <select onChange={(e) => setDwarf2(e.target.value)}>
        <option key="default" value="">Select Dwarf 2</option>
        {dwarfs.map((dwarf, index) => (
          <option key={`dwarf2_${index}`} value={dwarf.id}>
            {dwarf.name}
          </option>
        ))}
      </select>
      <button onClick={handleFight}>Simulate Fight</button>
      {result && (
        <div>
          <h2>Fight Result</h2>
          <p>{result.dwarf1Name} {result.status} by {result.msg} in {result.nbRound} rounds</p>
        </div>
      )}
    </div>
  );
};

export default withAuth(FightSimulator);
