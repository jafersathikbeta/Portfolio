import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

function Net({ lite }) {
  const spin = useRef(null)
  const width = useThree((s) => s.size.width)

  const pts = useMemo(() => {
    const count = lite ? 240 : 900
    return Float32Array.from({ length: count }, () => (Math.random() - 0.5) * 9)
  }, [lite])

  useFrame(({ pointer, clock }, delta) => {
    if (!spin.current) return
    const k = 1 - Math.pow(0.0005, delta)
    const targetY = clock.elapsedTime * 0.08 + pointer.x * 0.5
    const targetX = pointer.y * 0.3
    spin.current.rotation.y += (targetY - spin.current.rotation.y) * k
    spin.current.rotation.x += (targetX - spin.current.rotation.x) * k
  })

  // Wide screens: push the sphere to the right so it doesn't sit behind the text.
  const offsetX = width > 900 ? 1.8 : 0
  const scale = width < 500 ? 0.8 : 1

  return (
    <group position={[offsetX, 0, 0]} scale={scale}>
      <group ref={spin}>
        <mesh>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial color="#FF5B2E" wireframe transparent opacity={0.45} />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[pts, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#FFD166" size={0.035} />
        </points>
      </group>
    </group>
  )
}

export default function HeroScene({ lite = false, active = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={lite ? [1, 1.25] : [1, 1.5]}
      gl={{ antialias: !lite, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
    >
      <Net lite={lite} />
    </Canvas>
  )
}