import Link from 'next/link'
import { getAllBlogs } from '../services/blogs'

export default function Blogs() {
  const blogs = getAllBlogs().toSorted((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>Blogs</h1>

      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          <ul>
            <li>Author: {blog.author}</li>
            <li>ID: {blog.id}</li>
            <li>URL: {blog.url}</li>
            <li>Likes: {blog.likes}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}
