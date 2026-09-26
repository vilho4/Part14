'use client'

import { useActionState, useEffect } from 'react'
import { addToReadingListAction } from '@/app/actions/readingList'
import { useNotification } from './NotificationContext'

export default function AddToReadingListButton({
  blogId,
  blogTitle,
  isInReadingList,
}: {
  blogId: number
  blogTitle: string
  isInReadingList: boolean
}) {
  const [state, formAction] = useActionState(addToReadingListAction, null)
  const { showNotification } = useNotification()

  useEffect(() => {
    if (state?.success) {
      showNotification(`${blogTitle} added successfully to reading list`)
    }
  }, [state, blogTitle, showNotification])

  return (
    <>
      {!isInReadingList && (
        <form action={formAction}>
          <input type="hidden" name="blogId" value={blogId} />
          <button
            type="submit"
            className="btn btn-primary"
            data-testid="add-to-reading-list-button"
          >
            Add to reading list
          </button>
        </form>
      )}
    </>
  )
}
