import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { API } from '../api/axios'
import Container from '../components/Container'

export default function ViewPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)

  useEffect(() => {
    API.get(`/posts/${id}`).then(res => setPost(res.data)).catch(console.error)
  }, [id])

  const handleDelete = async () => {
    await API.delete(`/posts/${id}`)
    navigate('/')
  }

  if (!post) return <Container className="py-8">Loading...</Container>

  return (
    <Container className="py-8 max-w-3xl">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">By {post.author}</p>
      <p className="mb-6 whitespace-pre-line">{post.content}</p>

      {/* 🔹 Stylish Buttons */}
      <div className="flex gap-4">
        <Link
          to={`/edit/${post._id}`}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform"
        >
          Delete
        </button>
      </div>
    </Container>
  )
}
