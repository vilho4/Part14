import Link from 'next/link'
import { getUsers } from '../services/users'

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="page-container">
      <h1>Users</h1>

      <ul className="blog-list">
        {users.map((user) => (
          <li key={user.id} className="blog-item">
            <span className="text-muted">Username: </span>
            <Link href={`/users/${user.username}`} className="font-medium">
              {user.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
