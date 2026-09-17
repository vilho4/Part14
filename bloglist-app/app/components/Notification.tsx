'use client'

import { useNotification } from './NotificationContext'

export default function Notification() {
  const { message, type } = useNotification()

  console.log('Notification message:', message) // väliaikainen testi

  if (!message) return null

  return (
    <div
      className={type === 'success' ? 'bg-green-600 text-white p-3' : 'bg-red-600 text-white p-3'}
    >
      {message}
    </div>
  )
}
