import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/db'
import { users } from '@/db/schema'

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 }
    )
  }

  const { username, name, password } = await request.json()

  const passwordHash = await bcrypt.hash(password, 10)

  const [user] = await db
    .insert(users)
    .values({
      username,
      name,
      passwordHash,
    })
    .returning()

  return NextResponse.json(
    {
      id: user.id,
      username: user.username,
      name: user.name,
    },
    { status: 201 }
  )
}
