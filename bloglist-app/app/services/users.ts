import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { users } from '../../db/schema'
// import { auth } from '../../auth'

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: true,
    },
  })
}

// export const getCurrentUser = async () => {
//   const session = await auth()

//   if (!session?.user?.name) {
//     return null
//   }

//   return db.query.users.findFirst({
//     where: eq(users.username, session.user.name),
//   })
// }
