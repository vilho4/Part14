import Link from 'next/link'
import { getUsers } from '../services/users'

const Users = async () => {
  const users = await getUsers()

  return (
    <div>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>
              Käyttäjätunnus: <Link href={`/users/${user.username}`}>{user.username}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
