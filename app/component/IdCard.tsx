'use client'

import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Text } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'

export default function IdCard() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
            <Canvas
                camera={{ position: [0, 0, 13], fov: 25 }}
                gl={{
                    preserveDrawingBuffer: true,
                    antialias: true,
                    alpha: false
                }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={Math.PI} />
                <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                    <Card />
                </Physics>
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

function Card({ maxSpeed = 50, minSpeed = 10 }) {
    const fixed = useRef<any>()
    const j1 = useRef<any>()
    const j2 = useRef<any>()
    const j3 = useRef<any>()
    const card = useRef<any>()

    const vec = new THREE.Vector3()
    const ang = new THREE.Vector3()
    const rot = new THREE.Vector3()
    const dir = new THREE.Vector3()

    const segmentProps = {
        type: 'dynamic' as const,
        canSleep: true,
        colliders: false,
        angularDamping: 2,
        linearDamping: 2
    }

    const [dragged, drag] = useState<false | THREE.Vector3>(false)
    const [hovered, hover] = useState(false)

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab'
            return () => {
                document.body.style.cursor = 'auto'
            }
        }
    }, [hovered, dragged])

    useFrame((state, delta) => {
        // Only run if all refs are initialized
        if (!card.current || !j1.current || !j2.current || !j3.current || !fixed.current) {
            return
        }

        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
            dir.copy(vec).sub(state.camera.position).normalize()
            vec.add(dir.multiplyScalar(state.camera.position.length()))

                // Wake up all bodies
                ;[card, j1, j2, j3, fixed].forEach((ref) => {
                    if (ref.current?.wakeUp) {
                        ref.current.wakeUp()
                    }
                })

            if (card.current?.setNextKinematicTranslation) {
                card.current.setNextKinematicTranslation({
                    x: vec.x - dragged.x,
                    y: vec.y - dragged.y,
                    z: vec.z - dragged.z
                })
            }
        }

        // Smooth lerping for joints
        ;[j1, j2].forEach((ref) => {
            if (ref.current) {
                if (!ref.current.lerped) {
                    ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
                }
                const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
                ref.current.lerped.lerp(
                    ref.current.translation(),
                    delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
                )
            }
        })

        // Tilt the card back towards the screen
        if (card.current?.angvel && card.current?.rotation && card.current?.setAngvel) {
            ang.copy(card.current.angvel())
            rot.copy(card.current.rotation())
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
        }
    })

    return (
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
                <CuboidCollider args={[0.8, 1.125, 0.01]} />
                <group
                    scale={2.25}
                    position={[0, -1.2, -0.05]}
                    onPointerOver={() => hover(true)}
                    onPointerOut={() => hover(false)}
                    onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
                    onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>

                    {/* Card Body */}
                    <mesh>
                        <boxGeometry args={[1.6, 2.25, 0.02]} />
                        <meshPhysicalMaterial
                            color="#f8f9fa"
                            clearcoat={1}
                            clearcoatRoughness={0.15}
                            roughness={0.3}
                            metalness={0.1}
                        />
                    </mesh>

                    {/* Blue Header */}
                    <mesh position={[0, 0.8, 0.011]}>
                        <boxGeometry args={[1.6, 0.6, 0.001]} />
                        <meshStandardMaterial color="#2563eb" />
                    </mesh>

                    {/* Clip at top */}
                    <mesh position={[0, 1.3, 0]} rotation={[0, 0, 0]}>
                        <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
                        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
                    </mesh>

                    {/* Photo placeholder */}
                    <mesh position={[-0.35, 0.2, 0.011]}>
                        <boxGeometry args={[0.5, 0.6, 0.001]} />
                        <meshStandardMaterial color="#cbd5e1" />
                    </mesh>

                    {/* Text Labels */}
                    <Text position={[0.15, 0.4, 0.012]} fontSize={0.08} color="#1f2937" anchorX="left" anchorY="top">
                        JOHN DOE
                    </Text>
                    <Text position={[0.15, 0.25, 0.012]} fontSize={0.05} color="#64748b" anchorX="left" anchorY="top">
                        Software Engineer
                    </Text>
                    <Text position={[0.15, 0.1, 0.012]} fontSize={0.045} color="#64748b" anchorX="left" anchorY="top">
                        ID: 12345
                    </Text>

                    {/* Barcode */}
                    <mesh position={[0, -0.7, 0.011]}>
                        <boxGeometry args={[1.2, 0.3, 0.001]} />
                        <meshStandardMaterial color="#000000" />
                    </mesh>

                    {/* Company name at bottom */}
                    <Text position={[0, -1, 0.012]} fontSize={0.06} color="#2563eb" anchorX="center" anchorY="middle">
                        ACME CORP
                    </Text>
                </group>
            </RigidBody>
        </group>
    )
}