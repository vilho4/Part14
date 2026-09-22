import { redirect } from 'next/navigation'
import { getCurrentUser } from '../services/users'
import { generateTokenAction } from '../actions/users'

export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="page-narrow">
      <div className="card">
        <h1>My page</h1>

        <p>
          <strong>Name:</strong> {user.name ?? 'Not provided'}
        </p>

        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <h2>API token</h2>

        {user.token ? (
          <p className="break-all">{user.token}</p>
        ) : (
          <p className="text-muted">No API token generated yet.</p>
        )}

        <form action={generateTokenAction}>
          <button type="submit" className="btn btn-primary">
            Generate new token
          </button>
        </form>
      </div>
    </div>
  )
}
