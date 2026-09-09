import { notFound } from 'next/navigation'
import { getBlogById } from '../../services/blogs'
import { likeBlogAction } from '@/app/actions/blogs'

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
        <li>
          URL: <a href={blog.url}>{blog.url}</a>
        </li>
        <li>Likes: {blog.likes}</li>
        <li>
          <form action={likeBlogAction}>
            <input type="hidden" name="id" value={blog.id} />
            <button type="submit">Like</button>
          </form>
        </li>
      </ul>
    </div>
  )
}
