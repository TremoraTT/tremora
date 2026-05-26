import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

function Pill({ position, scale = 1, speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.15
    ref.current.rotation.x = Math.cos(state.clock.elapsedTime * speed * 0.2) * 0.1
  })
  return (
    <Float speed={speed * 0.6} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={ref} position={position} scale={scale}>
        <mesh position={[0, 0.3, 0]}>
          <capsuleGeometry args={[0.2, 0.35, 16, 16]} />
          <meshPhongMaterial color="#e8e8e8" specular="#ffffff" shininess={300} reflectivity={1} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <capsuleGeometry args={[0.2, 0.35, 16, 16]} />
          <meshPhongMaterial color="#e0e0e0" specular="#ffffff" shininess={300} reflectivity={1} />
        </mesh>
      </group>
    </Float>
  )
}

function Wristband({ position, scale = 1, speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.25) * 0.1 + 0.3
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.12
  })
  return (
    <Float speed={speed * 0.5} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={ref} position={position} scale={scale}>
        <mesh>
          <torusGeometry args={[0.4, 0.12, 16, 32]} />
          <meshPhongMaterial color="#e0e0e0" specular="#ffffff" shininess={350} reflectivity={1} />
        </mesh>
        <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.1, 0.16, 0.06]} />
          <meshPhongMaterial color="#d0d0d0" specular="#ffffff" shininess={250} />
        </mesh>
      </group>
    </Float>
  )
}

function Brain({ position, scale = 1, speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.08
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.15) * 0.05
  })
  return (
    <Float speed={speed * 0.4} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshPhongMaterial color="#e4e4e4" specular="#ffffff" shininess={300} flatShading reflectivity={1} />
      </mesh>
    </Float>
  )
}

function Pulse({ position, scale = 1, speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.15
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03
    ref.current.scale.setScalar(s)
  })
  return (
    <Float speed={speed * 0.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={ref} position={position} scale={scale}>
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshPhongMaterial color="#e8e8e8" specular="#ffffff" shininess={350} reflectivity={1} />
        </mesh>
      </group>
    </Float>
  )
}

function Torus({ position, scale = 1, speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.1
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.2) * 0.1
  })
  return (
    <Float speed={speed * 0.4} rotationIntensity={0.15} floatIntensity={0.25}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[0.3, 0.08, 16, 32]} />
        <meshPhongMaterial color="#e0e0e0" specular="#ffffff" shininess={350} reflectivity={1} />
      </mesh>
    </Float>
  )
}

export default function ChromeObjects({ objects = [] }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={4} />
      <directionalLight position={[-3, 4, 3]} intensity={2.5} color="#f8f0ff" />
      <directionalLight position={[0, -2, 4]} intensity={1.5} color="#fff5e8" />
      {objects.map((obj, i) => {
        switch (obj.type) {
          case 'pill': return <Pill key={i} {...obj} />
          case 'wristband': return <Wristband key={i} {...obj} />
          case 'brain': return <Brain key={i} {...obj} />
          case 'pulse': return <Pulse key={i} {...obj} />
          case 'torus': return <Torus key={i} {...obj} />
          default: return null
        }
      })}
    </Canvas>
  )
}
