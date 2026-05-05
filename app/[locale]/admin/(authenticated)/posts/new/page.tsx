import PostForm from '@/components/admin/PostForm'
import { createPost } from '../actions'

export default function NewPostPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">New Post</h1>
      <PostForm action={createPost} submitLabel="Create Post" />
    </div>
  )
}
