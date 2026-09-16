'use client'
import Link from 'next/link'
import { registerUser } from '../actions/users'
import { useActionState } from 'react'

type FormState = {
  errors: {
    username?: string
    name?: string
    password?: string
    passwordConfirm?: string
  }
  values: {
    username: string
    name: string
    password: string
    passwordConfirm: string
  }
}

const initialState: FormState = {
  errors: {},
  values: {
    username: '',
    name: '',
    password: '',
    passwordConfirm: '',
  },
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)
  return (
    <div>
      <h2>Register</h2>

      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" defaultValue={state.values.username} required />
          </label>
          {state.errors.username && <div style={{ color: 'red' }}>{state.errors.username}</div>}
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" defaultValue={state.values.name} required />
          </label>
          {state.errors.name && <div style={{ color: 'red' }}>{state.errors.name}</div>}
        </div>

        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          {state.errors.password && <div style={{ color: 'red' }}>{state.errors.password}</div>}
        </div>
        <div>
          <label>
            Password Confirmation
            <input type="password" name="passwordConfirm" required />
          </label>
          {state.errors.passwordConfirm && (
            <div style={{ color: 'red' }}>{state.errors.passwordConfirm}</div>
          )}
        </div>

        <button type="submit">Register</button>
      </form>

      <Link href="/login">Login</Link>
    </div>
  )
}
