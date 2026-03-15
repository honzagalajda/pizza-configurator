import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import type { Group } from 'three'
import { useConfig } from '../provider/config-provider'
import * as THREE from 'three'
import { TIME_SCALE } from 'constants/animations'

const PATH = '/3d/box/krabica.gltf'

export function BoxModel() {
  const [isVisible, setIsVisible] = useState(false)
  const group = useRef<Group>(null)
  const { scene, animations } = useGLTF(PATH)
  const { actions, mixer } = useAnimations(animations, group)
  const { sideScale, runBoxAnimationRef, showOrderDialog } = useConfig()

  useEffect(() => {
    runBoxAnimationRef.current = () => {
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
      runBoxAnimationRef.current = () => {}
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      setIsVisible(false)
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
      scale={[sideScale, sideScale, sideScale]}
    />
  )
}

useGLTF.preload(PATH)
