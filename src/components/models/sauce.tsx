import { useConfig } from '../provider/config-provider'
import { useWatch } from 'react-hook-form'
import { useRegularModel } from '@/hooks/useRegularModel'
import type { PizzaFormValues } from '@/schema/config.zod'

type Props = {
  type: PizzaFormValues['sauce']
  path: string
}
export function SauceModel({ type, path }: Props) {
  const { group, isVisible, scene, sideScale } = useRegularModel({
    path,
    isVisibleCondition: {
      name: 'sauce',
      value: type,
    },
    nextConfigName: 'cheese',
  })
  const { form } = useConfig()
  const crust = useWatch({
    control: form.control,
    name: 'crust',
  })
  const y = crust === 'stuffed' ? 0.006 : 0.003

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
