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

const FieldError = ({ error, testId }: { error?: string; testId: string }) => {
  if (!error) {
    return null
  }

  return (
    <div className="form-error" data-testid={testId}>
      {error}
    </div>
  )
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
            <FieldError error={state.errors.username} testId="username-error" />
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
            <FieldError error={state.errors.name} testId="name-error" />
          </div>

          <div className="form-group">
            <label>
              Password
              <input type="password" name="password" autoComplete="new-password" required />
            </label>
            <FieldError error={state.errors.password} testId="password-error" />
          </div>

          <div className="form-group">
            <label>
              Confirm Password
              <input type="password" name="passwordConfirm" autoComplete="new-password" required />
            </label>
            <FieldError error={state.errors.passwordConfirm} testId="passwordConfirm-error" />
          </div>

          <button type="submit" className="btn btn-primary" data-testid="register-button">
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
