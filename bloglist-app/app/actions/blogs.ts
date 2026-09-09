'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createBlog } from '../services/blogs'
import { likeBlog } from '../services/blogs'

export const createBlogAction = async (formData: FormData) => {
  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  createBlog({ title, author, url })
  revalidatePath('/blogs')
  redirect('/blogs')
}

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get('id'))

  likeBlog(id)

  revalidatePath(`/blogs/${id}`)
}
