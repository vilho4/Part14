import { notFound } from 'next/navigation'
import { getBlogById } from '../../services/blogs'

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <ul>
        <li>Author: {blog.author}</li>
        <li>ID: {blog.id}</li>
        <li>URL: {blog.url}</li>
        <li>Likes: {blog.likes}</li>
      </ul>
    </div>
  )
}
