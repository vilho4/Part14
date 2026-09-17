'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createBlog, likeBlog } from '../services/blogs'
import { auth } from '@/auth'

export const createBlogAction = async (previousState: unknown, formData: FormData) => {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  const title = (formData.get('title') as string).trim()
  const author = (formData.get('author') as string).trim()
  const url = (formData.get('url') as string).trim()

  const errors: {
    title?: string
    author?: string
    url?: string
  } = {}

  if (title.length < 5) {
    errors.title = 'Title must be at least 5 characters long'
  }

  if (author.length < 5) {
    errors.author = 'Author must be at least 5 characters long'
  }

  if (url.length < 5) {
    errors.url = 'URL must be at least 5 characters long'
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { title, author, url },
      success: false,
    }
  }

  await createBlog({ title, author, url })

  revalidatePath('/blogs')

  return {
    errors: {},
    values: {
      title: '',
      author: '',
      url: '',
    },
    success: true,
  }
}

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get('id'))

  await likeBlog(id)

  revalidatePath('/blogs')
  revalidatePath(`/blogs/${id}`)
}
