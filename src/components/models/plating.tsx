import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import type { Group } from 'three'
import { useConfig } from '../provider/config-provider'
import * as THREE from 'three'
import { TIME_SCALE } from 'constants/animations'

const PATH = '/3d/plating/plating.gltf'

export function PlatingModel() {
  const group = useRef<Group>(null)
  const { scene, animations } = useGLTF(PATH)
  const { actions } = useAnimations(animations, group)
  const { runPlatingAnimationRef } = useConfig()

  useEffect(() => {
    runPlatingAnimationRef.current = () => {
      const action = Object.values(actions)[0]
      if (!action) return
      action.timeScale = TIME_SCALE
      action.time = 0
      action.setLoop(THREE.LoopOnce, 1)
      action.clampWhenFinished = true
      action.play()
    }
    return () => {
      runPlatingAnimationRef.current = () => {}
    }
  }, [])

  return <primitive ref={group} object={scene} position={[0, -0.014, 0]} />
}

useGLTF.preload(PATH)
