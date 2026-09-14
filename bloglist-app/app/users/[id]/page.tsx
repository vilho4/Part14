import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getUserById, getBlogsByUserId } from '../../services/users'

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const user = await getUserById(Number(id))

  if (!user) {
    notFound()
  }

  const blogs = await getBlogsByUserId(user.id)

  return (
    <div>
      <h2>{user.username}</h2>

      <h3>Blogs</h3>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
