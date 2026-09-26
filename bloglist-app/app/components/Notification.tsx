'use client'

import { useNotification } from './NotificationContext'

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  return (
    <div
      data-testid="notification"
      className={type === 'success' ? 'bg-green-600 text-white p-3' : 'bg-red-600 text-white p-3'}
    >
      {message}
    </div>
  )
}
