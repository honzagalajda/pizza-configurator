import { cn } from '@/lib/utils'
import { CheckIcon } from 'lucide-react'
import type { PropsWithChildren } from 'react'

function CheckBadge() {
  return (
    <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground">
      <CheckIcon size={11} strokeWidth={3} />
    </span>
  )
}

type Props = PropsWithChildren<{
  selected: boolean
  onClick: () => void
  className?: string
  disabled?: boolean
}>
export function OptionButton({
  selected,
  onClick,
  children,
  className,
  disabled,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative rounded-xl border-2 text-left transition-colors cursor-pointer',
        selected
          ? 'border-primary bg-accent'
          : 'border-border bg-white hover:bg-muted/50',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {selected && <CheckBadge />}
      {children}
    </button>
  )
}
