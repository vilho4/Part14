'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useNotification } from './NotificationContext'
// import { useNotification } from './NotificationContext'

export default function NavBar() {
  // const { showNotification } = useNotification()
  const { data: session } = useSession()

  return (
    <nav>
      <Link href="/">home</Link>
      {' | '}
      <Link href="/blogs">blogs</Link>
      {' | '}
      <Link href="/users">users</Link>

      {session ? (
        <>
          {' | '}
          <Link href="/blogs/new">create new</Link>
          {' | '}
          <span>Signed in as {session.user?.name}</span>
          {' | '}
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          {' | '}
          <Link href="/login">login</Link>
          {' | '}
          <Link href="/register">register</Link>
        </>
      )}
      {/* <button onClick={() => showNotification('Test success')}>Test success</button>

      <button onClick={() => showNotification('Test error', 'error')}>Test error</button> */}
    </nav>
  )
}
