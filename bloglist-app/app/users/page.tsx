import Link from 'next/link'
import { getUsers } from '../services/users'

const Users = async () => {
  const users = await getUsers()
  console.log('Users:', users) // Log the users to the console for debugging

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
