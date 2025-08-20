import { createContext, useContext, useEffect, useState } from 'react';
import { API } from '../api/axios';

const PostsCtx = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      const { data } = await API.get('/posts');
      setPosts(data);
    } finally {
      setLoading(false);
    }
  }

  async function addPost(payload) {
    const { data } = await API.post('/posts', payload);
    // instant update
    setPosts((p) => [data, ...p]);
    return data;
  }

  async function updatePost(id, payload) {
    const { data } = await API.put(`/posts/${id}`, payload);
    setPosts((p) => p.map((x) => (x._id === id ? data : x)));
    return data;
  }

  async function deletePost(id) {
    // optimistic
    const prev = posts;
    setPosts((p) => p.filter((x) => x._id !== id));
    try {
      await API.delete(`/posts/${id}`);
    } catch (e) {
      setPosts(prev);
      throw e;
    }
  }

  useEffect(() => { refresh(); }, []);

  return (
    <PostsCtx.Provider value={{ posts, loading, refresh, addPost, updatePost, deletePost }}>
      {children}
    </PostsCtx.Provider>
  );
}

export function usePosts() {
  return useContext(PostsCtx);
}
