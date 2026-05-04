// Design Ref: §3.2, §6.1
'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-card border p-4 pr-8 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default:     'border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]',
        success:     'border-[var(--color-success)] bg-[var(--color-bg)] text-[var(--color-text)]',
        destructive: 'border-[var(--color-error)] bg-[var(--color-bg)] text-[var(--color-error)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
)
Toast.displayName = 'Toast'

const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]',
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
    <span className="sr-only">닫기</span>
  </button>
))
ToastClose.displayName = 'ToastClose'

const ToastTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
))
ToastTitle.displayName = 'ToastTitle'

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
))
ToastDescription.displayName = 'ToastDescription'

export { Toast, ToastClose, ToastTitle, ToastDescription }
