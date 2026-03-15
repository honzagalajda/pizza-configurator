import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import type { Group } from 'three'
import { useConfig } from '../provider/config-provider'
import * as THREE from 'three'
import { TIME_SCALE } from '@/constants/animations'
import { useWatch } from 'react-hook-form'

const PATH = '/3d/plate/tanier.gltf'

export function PlateModel() {
  const [isVisible, setIsVisible] = useState(false)
  const group = useRef<Group>(null)
  const { scene, animations } = useGLTF(PATH)
  const { actions, mixer } = useAnimations(animations, group)
  const { sideScale, runPlateAnimationRef, showOrderDialog, form } = useConfig()
  const crust = useWatch({ control: form.control, name: "crust" })
  const y = crust === "regular" ? -0.001 : -0.0028

  useEffect(() => {
    runPlateAnimationRef.current = () => {
      setIsVisible(true)
      const animationActions = Object.values(actions).filter(
        (action): action is THREE.AnimationAction => Boolean(action),
      )
      if (animationActions.length === 0) return
      animationActions.forEach((action) => {
        action.timeScale = TIME_SCALE
        action.time = 0
        action.setLoop(THREE.LoopOnce, 1)
        action.clampWhenFinished = true
        action.play()
      })
    }
    return () => {
      runPlateAnimationRef.current = () => {}
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      showOrderDialog()
    }

    mixer.addEventListener('finished', handler)
    return () => {
      mixer.removeEventListener('finished', handler)
    }
  }, [])

  return (
    <primitive
      ref={group}
      object={scene}
      visible={isVisible}
      position={[0, y, 0]}
      rotation={[0, Math.PI * 0.8, 0]}
      scale={[sideScale, 1, sideScale]}
    />
  )
}

useGLTF.preload(PATH)
