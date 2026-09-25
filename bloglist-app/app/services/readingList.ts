import { db } from '../../db'
import { blogs, readingList } from '../../db/schema'
import { and, eq } from 'drizzle-orm'

export const addToReadingList = async (userId: number, blogId: number) => {
  await db.insert(readingList).values({
    userId,
    blogId,
  })
}

export const isInReadingList = async (userId: number, blogId: number) => {
  const item = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  })

  return Boolean(item)
}

export const getReadingList = async (userId: number) => {
  return db
    .select()
    .from(readingList)
    .innerJoin(blogs, eq(readingList.blogId, blogs.id))
    .where(eq(readingList.userId, userId))
}
