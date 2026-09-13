import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { blogs } from '../../db/schema'

export const getAllBlogs = async () => {
  return db.query.blogs.findMany()
}

export const createBlog = async (blog: { title: string; author: string; url: string }) => {
  const [newBlog] = await db.insert(blogs).values(blog).returning()

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
