import { notFound } from 'next/navigation'
import { getBlogById } from '../../services/blogs'
import { likeBlogAction } from '@/app/actions/blogs'

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="page-container">
      <div className="card">
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
              <button type="submit" className="btn btn-primary">
                Like
              </button>
            </form>
          </li>
          {/* <li>User ID: {blog.userId}</li> */}
        </ul>
      </div>
    </div>
  )
}
