import { createFileRoute } from '@tanstack/react-router'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { CanvasLoadingFallback } from '@/components/canvas-loading-fallback'
import { PizzaSidebar } from '@/components/pizza-sidebar'
import { ConfigProvider } from '@/components/provider/config-provider'
import { DoughModel } from '@/components/models/dough'
import { ToppingModel } from '@/components/models/topping'
import { SauceModel } from '@/components/models/sauce'
import { CheeseModel } from '@/components/models/cheese'
import { PlatingModel } from '@/components/models/plating'
import { BoxModel } from '@/components/models/box'
import { FinishedOrderAlertDialog } from '@/components/alert-dialogs/finished-order'
import { CameraController } from '@/components/camera-controller'
import { PlateModel } from '@/components/models/plate'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <ConfigProvider>
      <FinishedOrderAlertDialog />
      <div className="w-screen h-screen">
        <div className="w-[calc(100%-448px)] h-screen">
          <Canvas camera={{ position: [0, 0.315, -0.315], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={<CanvasLoadingFallback />}>
              <PlateModel />
              <BoxModel />
              <ToppingModel
                name="corn"
                path="/3d/corn/kukurica.gltf"
                positions={{ basic: -0.01, stuffed: 0.003, cheese: 0.005 }}
              />
              <ToppingModel
                name="olives"
                path="/3d/olives/olivy.gltf"
                positions={{ basic: -0.0125, stuffed: 0.004, cheese: 0.004 }}
              />
              <ToppingModel
                name="mushrooms"
                path="/3d/mushroom/hrib.gltf"
                positions={{
                  basic: -0.007,
                  stuffed: 0.003,
                  cheese: 0.0055,
                }}
              />
              <ToppingModel
                name="pineapple"
                path="/3d/pineapple/ananas.gltf"
                positions={{ basic: -0.0055, stuffed: 0.003, cheese: 0.004 }}
              />
              <ToppingModel
                name="chili"
                path="/3d/chili/papricky.gltf"
                positions={{
                  basic: -0.01,
                  stuffed: 0.006,
                  cheese: 0.004,
                }}
              />
              <ToppingModel
                name="salami"
                path="/3d/salami/salamik.gltf"
                positions={{
                  basic: -0.011,
                  stuffed: 0.004,
                  cheese: 0.0045,
                }}
              />
              <CheeseModel type="mozzarella" path="/3d/mozzarella/syr.gltf" />
              <CheeseModel
                type="blue-cheese"
                path="/3d/blue-cheese/niva.gltf"
              />
              <SauceModel
                type="sour-cream"
                path="/3d/sour-cream/omacka smotana .gltf"
              />
              <SauceModel type="tomato" path="/3d/tomato-sauce/omacka.gltf" />
              <DoughModel
                type="stuffed"
                path="/3d/stuffed-dough/stuffed testo.gltf"
              />
              <DoughModel type="regular" path="/3d/dough/testo.gltf" />
              <PlatingModel />
              <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[10000, 0.08, 10000]} />
                <meshStandardMaterial color="white" />
              </mesh>
              <Environment preset="city" />
            </Suspense>
            <CameraController />
          </Canvas>
        </div>
        <PizzaSidebar />
      </div>
    </ConfigProvider>
  )
}
