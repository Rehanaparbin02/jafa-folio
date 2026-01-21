'use client'

import * as THREE from 'three'
import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, useTexture } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

// Type declarations for MeshLine
declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: any
        meshLineMaterial: any
    }
}

export default function IdCard() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#ffffffff' }}>
            <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
                <ambientLight intensity={Math.PI} />
                <Suspense fallback={null}>
                    <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                        <Band />
                    </Physics>
                </Suspense>
                <Environment background blur={0.75}>
                    <color attach="background" args={['black']} />
                    <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
                    <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
                </Environment>
            </Canvas>
        </div>
    )
}

function Band({ maxSpeed = 50, minSpeed = 10 }) {
    const band = useRef<any>(null)
    const fixed = useRef<any>(null)
    const j1 = useRef<any>(null)
    const j2 = useRef<any>(null)
    const j3 = useRef<any>(null)
    const card = useRef<any>(null)

    const vec = new THREE.Vector3()
    const ang = new THREE.Vector3()
    const rot = new THREE.Vector3()
    const dir = new THREE.Vector3()

    const segmentProps = {
        type: 'dynamic' as const,
        canSleep: true,
        colliders: false as const,
        angularDamping: 2,
        linearDamping: 2
    }

    const { width, height } = useThree((state) => state.size)
    const [curve] = useState(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
    ]))
    const [dragged, drag] = useState<false | THREE.Vector3>(false)
    const [hovered, hover] = useState(false)

    // Load the texture - useTexture handles errors internally with Suspense
    const [texture, strapTexture] = useTexture(['/assets/idcard/Frame 3.png', '/assets/idcard/strap.png'])

    useEffect(() => {
        strapTexture.wrapS = strapTexture.wrapT = THREE.RepeatWrapping
        strapTexture.repeat.set(10, 1)
    }, [strapTexture])

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.2, 0]])

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab'
            return () => {
                document.body.style.cursor = 'auto'
            }
        }
    }, [hovered, dragged])

    useFrame((state, delta) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
            dir.copy(vec).sub(state.camera.position).normalize()
            vec.add(dir.multiplyScalar(state.camera.position.length()))
                ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
            card.current?.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z
            })
        }
        if (fixed.current) {
            // Fix jitter with lerping
            ;[j1, j2].forEach((ref) => {
                if (!ref.current.lerped) {
                    ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
                }
                const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
                ref.current.lerped.lerp(
                    ref.current.translation(),
                    delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
                )
            })
            // Calculate catmull curve
            curve.points[0].copy(j3.current.translation())
            curve.points[1].copy(j2.current.lerped)
            curve.points[2].copy(j1.current.lerped)
            curve.points[3].copy(fixed.current.translation())
            band.current.geometry.setPoints(curve.getPoints(32))
            // Tilt back towards screen
            ang.copy(card.current.angvel())
            rot.copy(card.current.rotation())
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
        }
    })

    curve.curveType = 'chordal'

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type="fixed" />
                <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
                    <CuboidCollider args={[0.95, 1.35, 0.01]} />
                    <group
                        scale={1.2}
                        position={[0, 0, -0.05]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e) => {
                            const target = e.target as HTMLElement
                            target?.releasePointerCapture(e.pointerId)
                            drag(false)
                        }}
                        onPointerDown={(e) => {
                            const target = e.target as HTMLElement
                            target?.setPointerCapture(e.pointerId)
                            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
                        }}>

                        {/* Card Body with Image Texture */}
                        <mesh>
                            <boxGeometry args={[1.6, 2.25, 0.02]} />
                            <meshPhysicalMaterial
                                map={texture}
                                clearcoat={1}
                                clearcoatRoughness={0.15}
                                roughness={0.3}
                                metalness={0.1}
                            />
                        </mesh>

                        {/* Clip at top */}
                        {/* Simulated Hole */}
                        <mesh position={[0, 1, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.09, 0.09, 0.03, 32]} />
                            <meshBasicMaterial color="#000" />
                        </mesh>

                        {/* Simple Black Clip */}
                        <group position={[0, 1.15, 0.3]}>
                            {/* Connecting Clamp */}
                            <mesh position={[0, -0.05, 0]}>
                                <boxGeometry args={[0.08, 0.15, 0.03]} />
                                <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
                            </mesh>
                            {/* Swivel Cylinder */}
                            <mesh position={[0, 0.05, 0]}>
                                <cylinderGeometry args={[0.05, 0.05, 0.08, 16]} />
                                <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
                            </mesh>
                            {/* Top Ring */}
                            <mesh position={[0, 0.12, 0]} rotation={[0, Math.PI / 2, 0]}>
                                <torusGeometry args={[0.07, 0.01, 16, 32]} />
                                <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
                            </mesh>
                        </group>
                    </group>
                </RigidBody>
            </group>
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial
                    color="white"
                    resolution={[width, height]}
                    useMap
                    map={strapTexture}
                    repeat={[-3, 1]}
                    lineWidth={0.5}
                />
            </mesh>
        </>
    )
}