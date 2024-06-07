import withAuth from '../../utils/withAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/api';

const Topic = () => {
  const [topic, setTopic] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchTopic = async () => {
        try {
          const response = await api.get(`/topic/${id}`);
          setTopic(response.data);
          const userResponse = await api.get(`/user/${response.data.userId}`);
          setUser(userResponse.data);
        } catch (error) {
          console.error('Error fetching topic or user:', error);
        }
      };

      const fetchComments = async () => {
        try {
          const response = await api.get(`/topic/${id}/comment`);
          const commentsData = response.data.commentList;

          // Fetch user data for each comment
          const commentsWithUsers = await Promise.all(commentsData.map(async (comment) => {
            try {
              const userResponse = await api.get(`/user/${comment.userId}`);
              return { ...comment, user: userResponse.data };
            } catch (error) {
              console.error(`Error fetching user for comment ${comment.id}:`, error);
              return comment;
            }
          }));

          setComments(commentsWithUsers);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };

      fetchTopic();
      fetchComments();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/topic/${id}/comment`, { content: commentContent });
      const newComment = response.data;

      // Fetch user data for the new comment
      const userResponse = await api.get(`/user/${newComment.userId}`);
      const newCommentWithUser = { ...newComment, user: userResponse.data };

      setComments([...comments, newCommentWithUser]);
      setCommentContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      {topic && user && (
        <div>
          <h1>{topic.title}</h1>
          <p>{topic.content}</p>
          <p>Posted by: {user.username}</p>
        </div>
      )}
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.user && <p><b>@{comment.user.username}</b> <br/>{comment.content}</p>}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default withAuth(Topic);
