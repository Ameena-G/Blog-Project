import { useNavigate } from 'react-router-dom'
import { API } from '../api/axios'
import PostForm from '../components/PostForm'
import Container from '../components/Container'

export default function NewPost() {
  const navigate = useNavigate()

  const handleSubmit = async data => {
    await API.post('/posts', data)
    navigate('/')
  }

  return (
    <Container className="py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mt-12 mb-6">
        Create New Post
      </h1>
      <PostForm onSubmit={handleSubmit} />
    </Container>
  )
}
