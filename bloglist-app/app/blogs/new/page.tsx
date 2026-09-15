'use client'

import { createBlogAction } from '@/app/actions/blogs'
import { useActionState } from 'react'

type FormState = {
  errors: {
    title?: string
    author?: string
    url?: string
  }
  values: {
    title: string
    author: string
    url: string
  }
}

const initialState: FormState = {
  errors: {},
  values: {
    title: '',
    author: '',
    url: '',
  },
}

export default function NewBlog() {
  const [state, formAction] = useActionState(createBlogAction, initialState)
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" defaultValue={state.values.title} required />
          </label>
          {state.errors.title && <div style={{ color: 'red' }}>{state.errors.title}</div>}
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" defaultValue={state.values.author} required />
          </label>
          {state.errors.author && <div style={{ color: 'red' }}>{state.errors.author}</div>}
        </div>
        <div>
          <label>
            URL
            <input type="url" name="url" defaultValue={state.values.url} required />
          </label>
          {state.errors.url && <div style={{ color: 'red' }}>{state.errors.url}</div>}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
