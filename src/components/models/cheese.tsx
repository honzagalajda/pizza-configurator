import { useRegularModel } from '@/hooks/useRegularModel'
import type { PizzaFormValues } from '@/schema/config.zod'
import { useConfig } from '../provider/config-provider'
import { useWatch } from 'react-hook-form'

type Props = {
  type: PizzaFormValues["cheese"]
  path: string
}
export function CheeseModel({ type, path }: Props) {
  const { group, isVisible, scene, sideScale } = useRegularModel({
    path,
    isVisibleCondition: {
      name: 'cheese',
      value: type,
    },
    nextConfigName: 'toppings',
  })
  const { form } = useConfig()
  const crust = useWatch({
    control: form.control,
    name: 'crust',
  })
  const y = crust === 'stuffed' ? 0.012 : 0.008

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
