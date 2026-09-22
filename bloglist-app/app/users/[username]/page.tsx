import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getUserWithBlogs } from '../../services/users'

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="page-container">
      <div className="card mb-6">
        <h1 className="mb-0">
          {user.name ? `${user.username} alias ${user.name}` : user.username}
        </h1>
      </div>

      <h2>Blogs</h2>

      {user.blogs.length === 0 ? (
        <p className="text-muted">User has not added any blogs.</p>
      ) : (
        <ul className="blog-list">
          {user.blogs.map((blog) => (
            <li key={blog.id} className="blog-item">
              <Link href={`/blogs/${blog.id}`} className="font-medium">
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserPage
