import withAuth from '../../utils/withAuth';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import Link from 'next/link';

const Forum = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await api.get('/topic');
      setTopics(response.data.topicResponses);
    };

    fetchTopics();
  }, []);

  return (
    <div>
      <h1>Forum</h1>
      <Link href="/forum/new-topic">
        <button>Add New Topic</button>
      </Link>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link href={`/forum/${topic.id}`}>
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withAuth(Forum);
