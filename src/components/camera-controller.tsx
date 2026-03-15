import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useConfig } from './provider/config-provider'
import { OrbitControls } from '@react-three/drei'

export function CameraController() {
  const camera = useThree((state) => state.camera)
  const targetPosition = useRef<THREE.Vector3 | null>(null)
  const targetFov = useRef<number | null>(null)
  const { setCameraPositionRef,areControllsEnabled } = useConfig()

  useFrame(() => {
    const perspCamera = camera as THREE.PerspectiveCamera
    if (targetPosition.current) {
      camera.position.lerp(targetPosition.current, 0.05)
      if (camera.position.distanceTo(targetPosition.current) < 0.001) {
        camera.position.copy(targetPosition.current)
        targetPosition.current = null
      }
      camera.lookAt(0, 0, 0)
    }
    if (targetFov.current !== null) {
      perspCamera.fov += (targetFov.current - perspCamera.fov) * 0.05
      perspCamera.updateProjectionMatrix()
      if (Math.abs(perspCamera.fov - targetFov.current) < 0.1) {
        perspCamera.fov = targetFov.current
        perspCamera.updateProjectionMatrix()
        targetFov.current = null
      }
    }
  })
  useEffect(() => {
    setCameraPositionRef.current = ({ x, y, z, fov }) => {
      targetPosition.current = new THREE.Vector3(x, y, z)
      targetFov.current = fov
    }

    return () => {
      setCameraPositionRef.current = () => {}
    }
  }, [])

  return (
    <OrbitControls
      enabled={areControllsEnabled}
      maxPolarAngle={Math.PI / 2.2}
      minDistance={0.3}
      maxDistance={0.6}
    />
  )
}
