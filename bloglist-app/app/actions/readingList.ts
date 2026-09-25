'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser } from '../services/session'
import { addToReadingList } from '../services/readingList'

export const addToReadingListAction = async (previousState: unknown, formData: FormData) => {
  const user = await getCurrentUser()

  if (!user) {
    return {
      success: false,
      error: 'Not authenticated',
    }
  }

  const blogId = Number(formData.get('blogId'))

  await addToReadingList(user.id, blogId)

  revalidatePath(`/blogs/${blogId}`)

  return {
    success: true,
    error: '',
  }
}
