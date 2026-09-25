import { redirect } from 'next/navigation'
import { getCurrentUser } from '../services/session'
import { generateTokenAction } from '../actions/users'
import { getReadingList } from '../services/readingList'
import Link from 'next/link'

export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const readingList = await getReadingList(user.id)

  return (
    <div className="page-narrow">
      <div className="card">
        <h1>My profile</h1>

        <p>
          <strong>Name:</strong> {user.name ?? 'Not provided'}
        </p>

        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <h2>API token</h2>
        {user.token ? (
          <div>
            <p className="text-muted">Current token:</p>
            <p className="break-all">{user.token}</p>
          </div>
        ) : (
          <p className="text-muted">No API token generated yet.</p>
        )}

        <form action={generateTokenAction}>
          <button type="submit" className="btn btn-primary">
            Generate new token
          </button>
        </form>
      </div>

      <h2 className="mt-8">Reading list</h2>

      {readingList.length === 0 ? (
        <p className="text-muted">Your reading list is empty.</p>
      ) : (
        <ul className="reading-list">
          {readingList.map((item) => (
            <li key={item.reading_list.id} className="reading-list-item">
              <div>
                <Link href={`/blogs/${item.blogs.id}`} className="reading-list-title">
                  {item.blogs.title}
                </Link>

                <div className="reading-list-author">by {item.blogs.author}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
