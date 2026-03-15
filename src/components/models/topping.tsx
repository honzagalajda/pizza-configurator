import type { PizzaFormValues } from '@/schema/config.zod'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import type { Group } from 'three'
import { useConfig } from '../provider/config-provider'
import { useWatch } from 'react-hook-form'
import * as THREE from 'three'
import { TIME_SCALE } from '@/constants/animations'

type Props = {
  path: string
  name: NonNullable<PizzaFormValues['toppings']>[number]
  positions: {
    basic: number
    stuffed: number
    cheese: number
  }
}
export function ToppingModel({ path, name, positions }: Props) {
  const group = useRef<Group>(null)
  const { scene, animations } = useGLTF(path)
  const { actions } = useAnimations(animations, group)
  const { form, sideScale, isPizzaVisible } = useConfig()
  const [toppings, crust, cheese] = useWatch({
    control: form.control,
    name: ['toppings', 'crust', 'cheese'],
  })
  const isVisible = !!toppings?.includes(name) && isPizzaVisible
  const y =
    positions.basic +
    (crust === 'stuffed' ? positions.stuffed : 0) +
    (cheese !== 'none' ? positions.cheese : 0)

  useEffect(() => {
    const animationActions = Object.values(actions).filter(
      (action): action is THREE.AnimationAction => Boolean(action),
    )
    if (animationActions.length === 0 || !isVisible) return

    animationActions.forEach((action) => {
      action.timeScale = TIME_SCALE
      action.time = 0
      action.setLoop(THREE.LoopOnce, 1)
      action.clampWhenFinished = true
      action.play()
    })

    return () => {
      animationActions.forEach((action) => {
        action.stop()
      })
    }
  }, [actions, isVisible])

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
