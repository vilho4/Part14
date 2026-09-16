'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { db } from '../../db'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'

export const registerUser = async (previousstate: unknown, formData: FormData) => {
  const username = (formData.get('username') as string)?.trim()
  const name = (formData.get('name') as string)?.trim()
  const password = formData.get('password') as string
  const passwordConfirm = formData.get('passwordConfirm') as string

  console.log(password, 'password test')
  console.log(passwordConfirm, 'password confirmation test')

  const errors: {
    username?: string
    name?: string
    password?: string
    passwordConfirm?: string
  } = {}

  if (username.length < 4) {
    errors.username = 'Username must be at least 4 characters long'
  } else {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    })

    if (existingUser) {
      errors.username = 'Username is already taken'
    }
  }

  if (password.length < 4) {
    errors.password = 'Password must be at least 4 characters long'
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match'
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password, passwordConfirm: passwordConfirm } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect('/login')
}
