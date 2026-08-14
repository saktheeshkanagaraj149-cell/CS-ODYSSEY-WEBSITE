import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { OrbitControls, Html, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { MODEL_URL, PART_DEFS, matchPart } from '../data/content.js'

function PulseBox({ position, size, color }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.32 + Math.abs(Math.sin(clock.elapsedTime * 3)) * 0.25
    }
  })
  return (
    <group position={position}>
      <mesh ref={ref}>
        <boxGeometry args={size} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.4} depthWrite={false} />
      </mesh>
    </group>
  )
}

function PartHighlight({ group, color }) {
  if (!group) return null
  const size = [
    Math.max(group.size.x * 1.15, 0.05),
    Math.max(group.size.y * 1.15, 0.05),
    Math.max(group.size.z * 1.15, 0.05),
  ]
  return <PulseBox position={group.center} size={size} color={color} />
}

function HoverTooltip({ group }) {
  if (!group) return null
  const def = PART_DEFS[group.key]
  return (
    <Html position={group.center} center zIndexRange={[20, 0]}>
      <div className="pointer-events-none flex items-center gap-2 whitespace-nowrap rounded-md border border-gold/50 bg-panel/90 px-3 py-1.5 font-display text-xs font-bold tracking-wider text-ink shadow-[0_0_18px_rgba(245,197,24,0.3)] backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-pcb animate-pulse-soft" />
        {def ? (
          <>
            <def.icon size={13} strokeWidth={2} />
            {def.shortName}
          </>
        ) : (
          group.key
        )}
      </div>
    </Html>
  )
}

function fitCamera(controls, camera, bounds) {
  if (!bounds || !controls) return
  const dist = bounds.size.length() * 1.5 + 0.4
  const dir = new THREE.Vector3(1, 0.6, 1).normalize()
  camera.position.copy(bounds.center).addScaledVector(dir, dist)
  controls.target.copy(bounds.center)
  camera.lookAt(controls.target)
  controls.update()
}

function CameraRig({ bounds, selectedGroup, resetCount }) {
  const { camera } = useThree()
  const controls = useRef()
  const anim = useRef(null)
  const lastFocus = useRef(undefined)
  const lastReset = useRef(null)

  useFrame((_, delta) => {
    const controlsObj = controls.current
    if (!controlsObj) return

    if (resetCount !== lastReset.current) {
      lastReset.current = resetCount
      fitCamera(controlsObj, camera, bounds)
    }

    if (selectedGroup && selectedGroup !== lastFocus.current) {
      const focus = selectedGroup
      const dist = Math.max(focus.size.length() * 2.4, 0.4)
      const dir = new THREE.Vector3(0.7, 0.4, 1).normalize()
      anim.current = {
        from: camera.position.clone(),
        to: focus.center.clone().addScaledVector(dir, dist),
        t: 0,
        focus,
      }
      lastFocus.current = focus
    }
    if (!selectedGroup) lastFocus.current = undefined

    if (anim.current) {
      anim.current.t = Math.min(1, anim.current.t + delta / 1.2)
      const { t, from, to, focus } = anim.current
      const k = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
      camera.position.lerpVectors(from, to, k)
      controlsObj.target.lerp(focus.center, k)
      camera.lookAt(controlsObj.target)
      controlsObj.update()
      if (t >= 1) anim.current = null
    }
  })

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      autoRotate={!selectedGroup}
      autoRotateSpeed={1.1}
      minDistance={0.05}
      maxDistance={40}
    />
  )
}

function Model({ selectedKey, hoverKey, resetCount, onSelect, onHover, onFound, onReady }) {
  const fbx = useLoader(FBXLoader, MODEL_URL, (loader) => {
    loader.resourcePath = '/models/motherboard/'
  })

  const { groups, bounds } = useMemo(() => {
    const meshes = []
    fbx.traverse((child) => {
      if (!child.isMesh) return
      child.updateWorldMatrix(true, false)
      meshes.push(child)
    })

    const map = {}
    for (const m of meshes) {
      const key = matchPart(m)
      if (!map[key]) map[key] = { key, meshes: [] }
      map[key].meshes.push(m)
    }

    const groupsArr = Object.values(map)
    const whole = new THREE.Box3()
    for (const g of groupsArr) {
      const box = new THREE.Box3()
      g.meshes.forEach((m) => box.expandByObject(m))
      g.center = box.getCenter(new THREE.Vector3())
      g.size = box.getSize(new THREE.Vector3())
      whole.union(box)
    }

    return {
      groups: groupsArr,
      bounds: {
        center: whole.getCenter(new THREE.Vector3()),
        size: whole.getSize(new THREE.Vector3()),
      },
    }
  }, [fbx])

  useEffect(() => {
    console.group('[CS Odyssey] parts discovered on the motherboard')
    groups.forEach((g) => {
      const matNames = [
        ...new Set(
          g.meshes.flatMap((m) => (Array.isArray(m.material) ? m.material.map((x) => x.name) : [m.material?.name])),
        ),
      ]
      console.log(`%c${g.key}%c (${g.meshes.length} meshes)`, 'color:#00e5ff', 'color:inherit', matNames)
    })
    console.groupEnd()
    onFound(groups.map((g) => g.key))
    onReady(true)
  }, [groups, onFound, onReady])

  const partKeyFromEvent = (e) => {
    let obj = e.object
    while (obj && !obj.name) obj = obj.parent
    return matchPart(obj)
  }

  const selectedGroup = groups.find((g) => g.key === selectedKey)
  const hoverGroup = groups.find((g) => g.key === hoverKey)

  return (
    <group>
      <primitive
        object={fbx}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(partKeyFromEvent(e))
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(partKeyFromEvent(e))
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onHover(null)
        }}
      />
      <PartHighlight group={hoverGroup} color="#00e5ff" />
      <PartHighlight group={selectedGroup} color="#f5c518" />
      <HoverTooltip group={hoverGroup} />
      <CameraRig bounds={bounds} selectedGroup={selectedGroup} resetCount={resetCount} />
    </group>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 10, 7]} intensity={1.3} />
      <pointLight position={[-6, -3, -5]} intensity={0.7} color="#00e5ff" />
      <pointLight position={[6, -2, 5]} intensity={0.55} color="#f5c518" />
    </>
  )
}

export default function MotherboardScene({ selectedKey, hoverKey, resetCount, onSelect, onHover, onFound, onReady }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [4, 3, 5], fov: 45, near: 0.001, far: 5000 }}
    >
      <color attach="background" args={['#0a0e1a']} />
      <Stars radius={90} depth={40} count={1800} factor={3.2} saturation={0} fade speed={1} />
      <Suspense fallback={null}>
        <Lights />
        <Model
          selectedKey={selectedKey}
          hoverKey={hoverKey}
          resetCount={resetCount}
          onSelect={onSelect}
          onHover={onHover}
          onFound={onFound}
          onReady={onReady}
        />
      </Suspense>
    </Canvas>
  )
}
