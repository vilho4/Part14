import { redirect } from 'next/navigation'
import { getCurrentUser } from '../services/session'
import { generateTokenAction } from '../actions/users'
import { getReadingList } from '../services/readingList'
import Link from 'next/link'
import { markAsReadAction } from '../actions/readingList'

export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const readingList = await getReadingList(user.id)

  const unreadBlogs = readingList.filter((item) => !item.reading_list.read)
  const readBlogs = readingList.filter((item) => item.reading_list.read)

  return (
    <div className="page-narrow">
      <div className="card" data-testid="user-profile">
        <h1>My profile</h1>

        <p data-testid="user-name">
          <strong>Name:</strong> {user.name ?? 'Not provided'}
        </p>

        <p data-testid="user-username">
          <strong>Username:</strong> {user.username}
        </p>

        <div data-testid="api-token-section">
          <h2>API token</h2>

          {user.token ? (
            <div data-testid="token-display">
              <p className="text-muted">Current token:</p>
              <p className="break-all" data-testid="api-token">
                {user.token}
              </p>
            </div>
          ) : (
            <p className="text-muted" data-testid="no-token-message">
              No API token generated yet.
            </p>
          )}

          <form action={generateTokenAction}>
            <button type="submit" className="btn btn-primary" data-testid="generate-token-button">
              Generate new token
            </button>
          </form>
        </div>
      </div>

      <div data-testid="reading-list-section">
        <h2 className="mt-8">Reading list</h2>

        {readingList.length === 0 ? (
          <p className="text-muted" data-testid="empty-reading-list">
            Your reading list is empty.
          </p>
        ) : (
          <>
            <div data-testid="unread-section">
              <h3>Unread ({unreadBlogs.length})</h3>

              {unreadBlogs.length === 0 ? (
                <p className="text-muted" data-testid="no-unread-blogs">
                  No unread blogs.
                </p>
              ) : (
                <ul className="reading-list">
                  {unreadBlogs.map((item) => (
                    <li key={item.reading_list.id} className="reading-list-item">
                      <div>
                        <Link href={`/blogs/${item.blogs.id}`} className="reading-list-title">
                          {item.blogs.title}
                        </Link>

                        <div className="reading-list-author">by {item.blogs.author}</div>
                      </div>

                      <form action={markAsReadAction}>
                        <input type="hidden" name="readingListId" value={item.reading_list.id} />

                        <button
                          type="submit"
                          className="btn btn-success"
                          data-testid={`mark-read-${item.reading_list.id}`}
                        >
                          Mark as read
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <h3 className="mt-6">Read ({readBlogs.length})</h3>

            {readBlogs.length === 0 ? (
              <p className="text-muted">No read blogs.</p>
            ) : (
              <ul className="reading-list">
                {readBlogs.map((item) => (
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
          </>
        )}
      </div>
    </div>
  )
}
