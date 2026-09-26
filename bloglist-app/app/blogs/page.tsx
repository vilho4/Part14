import Link from 'next/link'
import { getAllBlogs } from '../services/blogs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blogs | Bloglist',
  description: 'Browse blogs shared by Bloglist users',
}

export default async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const { filter } = await searchParams
  const searchQuery = filter?.toLowerCase() ?? ''

  const blogs = await getAllBlogs()
  const displayedBlogs = blogs
    .filter((blog) => blog.title.toLowerCase().includes(searchQuery))
    .toSorted((a, b) => b.likes - a.likes)

  return (
    <div className="page-container">
      <h1>Blogs</h1>

      <form className="search-form">
        <input type="text" name="filter" defaultValue={filter ?? ''} />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <div className="blog-list">
        {displayedBlogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>

            <ul>
              <li>Author: {blog.author}</li>
              <li>ID: {blog.id}</li>
              <li>URL: {blog.url}</li>
              <li>Likes: {blog.likes}</li>
              {/* <li>User ID: {blog.userId}</li> */}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
