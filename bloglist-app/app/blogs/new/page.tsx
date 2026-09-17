'use client'

import { createBlogAction } from '@/app/actions/blogs'
import { useActionState, useEffect } from 'react'
import { useNotification } from '@/app/components/NotificationContext'
import { useRouter } from 'next/navigation'

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
  success: boolean
}

const initialState: FormState = {
  errors: {},
  values: {
    title: '',
    author: '',
    url: '',
  },
  success: false,
}

export default function NewBlog() {
  const [state, formAction] = useActionState(createBlogAction, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification('Blog created successfully', 'success')
      router.push('/blogs')
    }
  }, [state.success, showNotification, router])
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" defaultValue={state.values.title} required />
          </label>
          {state.errors.title && <div className="text-red-500">{state.errors.title}</div>}
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" defaultValue={state.values.author} required />
          </label>
          {state.errors.author && <div className="text-red-500">{state.errors.author}</div>}
        </div>
        <div>
          <label>
            URL
            <input type="url" name="url" defaultValue={state.values.url} required />
          </label>
          {state.errors.url && <div className="text-red-500">{state.errors.url}</div>}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
