import Container from '../components/Container'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-500 mb-6">Page not found</p>
      <Link to="/" className="text-brand-600 hover:underline">Go Home</Link>
    </Container>
  )
}