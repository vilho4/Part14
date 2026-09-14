'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function NavBar() {
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
    </nav>
  )
}
