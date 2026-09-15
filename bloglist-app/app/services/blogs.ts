import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { blogs } from '../../db/schema'
import { getCurrentUser } from './session'

export const getAllBlogs = async () => {
  return db.query.blogs.findMany()
}

export const createBlog = async (blog: { title: string; author: string; url: string }) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Not logged in')
  }

  if (blog.title.length < 5 || blog.author.length < 5 || blog.url.length < 5) {
    throw new Error('All fields must be at least 5 characters long')
  }

  const [newBlog] = await db
    .insert(blogs)
    .values({
      ...blog,
      userId: user.id,
    })
    .returning()

  return newBlog
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id)

  if (!blog) {
    return undefined
  }

  const [updatedBlog] = await db
    .update(blogs)
    .set({ likes: blog.likes + 1 })
    .where(eq(blogs.id, id))
    .returning()

  return updatedBlog
}
