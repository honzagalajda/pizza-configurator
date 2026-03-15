import { useRegularModel } from '@/hooks/useRegularModel'
import type { PizzaFormValues } from '@/schema/config.zod'
import { useEffect } from 'react'
import { useConfig } from '../provider/config-provider'

type Props = {
  type: PizzaFormValues['crust']
  path: string
}
export function DoughModel({ type, path }: Props) {
  const { group, isVisible, scene, sideScale, mixer } = useRegularModel({
    path,
    isVisibleCondition: {
      name: 'crust',
      value: type,
    },
    nextConfigName: 'sauce',
  })
  const { enableForm } = useConfig()

  useEffect(() => {
    mixer.addEventListener('finished', enableForm)

    return () => {
      mixer.removeEventListener('finished', enableForm)
    }
  }, [mixer])

  return (
    <primitive
      ref={group}
      visible={isVisible}
      object={scene}
      scale={[sideScale, 1, sideScale]}
    />
  )
}
