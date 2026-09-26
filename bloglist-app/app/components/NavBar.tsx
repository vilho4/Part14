'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
// import { useNotification } from './NotificationContext'

export default function NavBar() {
  // const { showNotification } = useNotification()
  const { data: session } = useSession()

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link href="/" className="font-bold">
          home
        </Link>

        <Link href="/blogs">blogs</Link>
        <Link href="/users">users</Link>

        {session ? (
          <>
            <Link href="/blogs/new">create new</Link>
            <Link href="/me">me</Link>

            <div className="ml-auto flex items-center gap-4">
              <span className="text-muted text-sm">Signed in as {session.user?.name}</span>

              <button type="button" onClick={() => signOut()} className="btn btn-secondary">
                logout
              </button>
            </div>
          </>
        ) : (
          <div className="ml-auto flex items-center gap-4">
            <Link href="/login">login</Link>
            <Link href="/register" className="btn btn-primary !text-white">
              register
            </Link>
          </div>
        )}

        {/* <button onClick={() => showNotification('Test success')}>Test success</button>

        <button onClick={() => showNotification('Test error', 'error')}>Test error</button> */}
      </div>
    </nav>
  )
}
