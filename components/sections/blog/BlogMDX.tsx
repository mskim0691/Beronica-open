import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

interface BlogMDXProps {
  source: string
}

function Callout({ type = 'info', children }: { type?: 'info' | 'warning' | 'tip'; children: React.ReactNode }) {
  const styles = {
    info: 'border-[var(--color-primary)] bg-[var(--color-primary)]/5',
    warning: 'border-[var(--color-accent)] bg-[var(--color-accent)]/5',
    tip: 'border-[var(--color-success)] bg-[var(--color-success)]/5',
  }
  return (
    <div className={`my-6 rounded-[var(--radius-card)] border-l-4 p-4 ${styles[type]}`}>
      {children}
    </div>
  )
}

const mdxComponents = {
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="mt-12 mb-4 text-2xl font-bold text-[var(--color-text)]" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-[var(--color-text)]" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="my-4 leading-relaxed" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a className="text-[var(--color-primary)] underline-offset-2 hover:underline" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="my-4 ml-6 list-disc space-y-2" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="my-4 ml-6 list-decimal space-y-2" {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote className="my-6 border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-text-secondary)]" {...props} />
  ),
  pre: (props: React.ComponentProps<'pre'>) => (
    <pre className="my-6 overflow-x-auto rounded-[var(--radius-card)] bg-[var(--color-surface)] p-4 text-sm" {...props} />
  ),
  code: (props: React.ComponentProps<'code'>) => {
    const isInline = !props.className
    if (isInline) {
      return <code className="rounded bg-[var(--color-surface)] px-1.5 py-0.5 font-mono text-sm" {...props} />
    }
    return <code className="font-mono" {...props} />
  },
  img: (props: React.ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="my-6 rounded-[var(--radius-card)]" alt={props.alt || ''} {...props} />
  ),
  Callout,
}

export default async function BlogMDX({ source }: BlogMDXProps) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
      },
    },
  })

  return (
    <div className="prose-beronica">
      {content}
    </div>
  )
}
