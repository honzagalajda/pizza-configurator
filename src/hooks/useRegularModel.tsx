import { useConfig } from '@/components/provider/config-provider'
import type { PizzaFormValues } from '@/schema/config.zod'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useWatch } from 'react-hook-form'
import type { Group } from 'three'
import * as THREE from 'three'

type Props = {
  path: string
  isVisibleCondition: {
    name: keyof PizzaFormValues
    value: string
  }
  nextConfigName: keyof PizzaFormValues
}
export function useRegularModel({
  path,
  isVisibleCondition,
  nextConfigName,
}: Props) {
  const group = useRef<Group>(null)
  const { scene, animations } = useGLTF(path)
  const { actions, mixer } = useAnimations(animations, group)
  const { sideScale, form, isPizzaVisible } = useConfig()
  const [currentConfig, nextConfig] = useWatch({
    control: form.control,
    name: [isVisibleCondition.name, nextConfigName],
  })
  const isVisible = currentConfig === isVisibleCondition.value && isPizzaVisible

  useEffect(() => {
    const action = Object.values(actions)[0]
    if (!action || !isVisible) return
    if (Array.isArray(nextConfig) ? nextConfig.length : nextConfig) {
      action.reset()
      action.time = action.getClip().duration // jump to end
      action.setLoop(THREE.LoopOnce, 1)
      action.clampWhenFinished = true
      action.timeScale = 0 // freeze, don't animate
      action.play()
      return () => {
        action.stop()
      }
    }
    action.timeScale = 0.75 
    action.time = 0
    action.setLoop(THREE.LoopOnce, 1)
    action.clampWhenFinished = true
    action.play()
    return () => {
      action.stop()
    }
  }, [actions, currentConfig])

  return {
    scene,
    group,
    isVisible,
    sideScale,
    mixer,
  }
}
