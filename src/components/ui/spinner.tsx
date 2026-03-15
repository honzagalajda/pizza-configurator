import * as React from 'react'
import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<typeof LoaderCircle>) {
  return (
    <LoaderCircle
      aria-hidden="true"
      className={cn('size-4 animate-spin text-primary', className)}
      {...props}
    />
  )
}

export { Spinner }