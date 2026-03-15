import { Html } from '@react-three/drei'

import { Spinner } from '@/components/ui/spinner'

export function CanvasLoadingFallback() {
  console.log('CanvasLoadingFallback rendered')
  return (
    <Html center>
      <Spinner className="size-10 text-primary" />
    </Html>
  )
}
