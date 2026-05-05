'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { PostFormState } from '@/app/[locale]/admin/(authenticated)/posts/actions'

interface PostFormProps {
  action: (prevState: PostFormState, formData: FormData) => Promise<PostFormState>
  initialData?: {
    title: string
    slug: string
    locale: string
    category: string
    tags: string[]
    description: string
    image: string | null
    author: string
    featured: boolean
    published: boolean
    content: string
    date: string
  }
  submitLabel: string
}

const CATEGORIES = ['GTD', 'PARA', 'AI Memory', 'Build Log', 'Tutorial']

export default function PostForm({ action, initialData, submitLabel }: PostFormProps) {
  const [state, formAction, pending] = useActionState(action, {})
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.push('/admin/posts')
      router.refresh()
    }
  }, [state.success, router])

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Title *</label>
          <input
            id="title"
            name="title"
            defaultValue={initialData?.title}
            required
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Slug *</label>
          <input
            id="slug"
            name="slug"
            defaultValue={initialData?.slug}
            required
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="locale" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Locale</label>
          <select
            id="locale"
            name="locale"
            defaultValue={initialData?.locale ?? 'ko'}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
          >
            <option value="ko">Korean</option>
            <option value="en">English</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Category *</label>
          <select
            id="category"
            name="category"
            defaultValue={initialData?.category ?? 'GTD'}
            required
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Date *</label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={initialData?.date ?? new Date().toISOString().split('T')[0]}
            required
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Tags (comma-separated)</label>
          <input
            id="tags"
            name="tags"
            defaultValue={initialData?.tags?.join(', ')}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Author</label>
          <input
            id="author"
            name="author"
            defaultValue={initialData?.author ?? 'Minsu Kim'}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Description *</label>
        <textarea
          id="description"
          name="description"
          rows={2}
          defaultValue={initialData?.description}
          required
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] resize-none"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Image URL</label>
        <input
          id="image"
          name="image"
          defaultValue={initialData?.image ?? ''}
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Content (MDX) *</label>
        <textarea
          id="content"
          name="content"
          rows={20}
          defaultValue={initialData?.content}
          required
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-mono text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] resize-y"
        />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <input type="checkbox" name="published" defaultChecked={initialData?.published ?? true} className="rounded" />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <input type="checkbox" name="featured" defaultChecked={initialData?.featured ?? false} className="rounded" />
          Featured
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {pending ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}
