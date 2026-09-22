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
    <div className="page-narrow">
      <div className="card">
        <h1>Register</h1>

        <form action={formAction}>
          <div className="form-group">
            <label>
              Username
              <input
                type="text"
                name="username"
                defaultValue={state.values.username}
                autoComplete="username"
                required
              />
            </label>
            {state.errors.username && <div className="form-error">{state.errors.username}</div>}
          </div>

          <div className="form-group">
            <label>
              Name
              <input
                type="text"
                name="name"
                defaultValue={state.values.name}
                autoComplete="name"
                required
              />
            </label>
            {state.errors.name && <div className="form-error">{state.errors.name}</div>}
          </div>

          <div className="form-group">
            <label>
              Password
              <input type="password" name="password" autoComplete="new-password" required />
            </label>
            {state.errors.password && <div className="form-error">{state.errors.password}</div>}
          </div>

          <div className="form-group">
            <label>
              Password Confirmation
              <input type="password" name="passwordConfirm" autoComplete="new-password" required />
            </label>
            {state.errors.passwordConfirm && (
              <div className="form-error">{state.errors.passwordConfirm}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>

        <p className="text-muted mt-6 mb-0">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}
