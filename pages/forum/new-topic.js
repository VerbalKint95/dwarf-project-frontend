import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/api';
import withAuth from '../../utils/withAuth';

const NewTopic = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/topic', { title, content });
      router.push('/forum');
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  return (
    <div>
      <h1>Add New Topic</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default withAuth(NewTopic);
