import { useToppingModel } from '@/hooks/useToppingModel'
import type { UseToppingModelProps } from '@/hooks/useToppingModel'

export function ToppingModel(props: UseToppingModelProps) {
  const { scene, group, isVisible, y, sideScale } = useToppingModel(props)

  return (
    <primitive
      visible={isVisible}
      position={[0, y, 0]}
      ref={group}
      object={scene}
      scale={[sideScale, 1, sideScale]}
    />
  )
}
