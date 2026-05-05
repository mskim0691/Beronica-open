'use client'

import { useRouter } from 'next/navigation'
import { deletePost } from '../actions'

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this post?')) return
    await deletePost(id)
    router.push('/admin/posts')
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
    >
      Delete
    </button>
  )
}
