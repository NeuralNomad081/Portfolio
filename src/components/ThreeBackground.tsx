"use client";
import { useRef, useMemo, useState, useEffect, Component, ReactNode, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Billboard, Svg, Line } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

const baseLogos = [
    "https://cdn.simpleicons.org/python/3776AB",
    "https://cdn.simpleicons.org/react/61DAFB",
    "https://cdn.simpleicons.org/typescript/3178C6",
    "https://cdn.simpleicons.org/tensorflow/FF6F00",
    "https://cdn.simpleicons.org/pytorch/EE4C2C",
    "https://cdn.simpleicons.org/nextdotjs/ffffff",
    "https://cdn.simpleicons.org/docker/2496ED",
    "https://cdn.simpleicons.org/kubernetes/326CE5",
    "https://cdn.simpleicons.org/fastapi/009688",
    "https://cdn.simpleicons.org/flask/ffffff",
    "https://cdn.simpleicons.org/git/F05032",
    "https://cdn.simpleicons.org/openjdk/007396",
    "https://cdn.simpleicons.org/c/A8B9CC",
    "https://cdn.simpleicons.org/cpp/00599C",
    "https://cdn.simpleicons.org/javascript/F7DF1E",
    "https://cdn.simpleicons.org/html5/E34F26",
    "https://cdn.simpleicons.org/css3/1572B6",
    "https://cdn.simpleicons.org/postgresql/4169E1",
    "https://cdn.simpleicons.org/mongodb/47A248",
    "https://cdn.simpleicons.org/linux/FCC624",
    "https://cdn.simpleicons.org/postman/FF6C37",
    "https://cdn.simpleicons.org/huggingface/FFD21E",
    "https://cdn.simpleicons.org/pandas/150458",
    "https://cdn.simpleicons.org/numpy/013243",
    "https://cdn.simpleicons.org/scikitlearn/F7931E",
    "https://cdn.simpleicons.org/openai/412991"
];

const logos = [...baseLogos, ...baseLogos]; // Duplicate for density

class LogoErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: any) {
        // console.warn("Logo failed to load:", error);
    }
    render() {
        if (this.state.hasError) {
            return null;
        }
        return this.props.children;
    }
}

function LogoNode({ url, position }: { url: string; position: [number, number, number] }) {
    return (
        <Billboard position={position}>
            <Svg src={url} scale={0.006} />
        </Billboard>
    );
}

const seededRandom = (s: number) => {
    const mask = 0xffffffff;
    let m_w = (123456789 + s) & mask;
    let m_z = (987654321 - s) & mask;
    return () => {
        m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
        let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
        result /= 4294967296;
        return result;
    };
};

function ParticleField(props: any) {
    const ref = useRef<any>(null);
    const [sphere, setSphere] = useState<Float32Array | null>(null);

    useEffect(() => {
        const count = 1500;
        const temp = new Float32Array(count * 3);
        const random = seededRandom(12345); // Consistent seed
        const radius = 2.0;

        for (let i = 0; i < count; i++) {
            const u = random();
            const v = random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = radius * Math.cbrt(random());
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            temp[i * 3] = x;
            temp[i * 3 + 1] = y;
            temp[i * 3 + 2] = z;
        }
        setSphere(temp);
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;
        }
    });

    if (!sphere) return null;

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00f0ff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.5}
                />
            </Points>
        </group>
    );
}

function NeuralNetworkCloud() {
    const groupRef = useRef<any>(null);
    const [networkData, setNetworkData] = useState<{ positions: THREE.Vector3[], connections: THREE.Vector3[][] } | null>(null);

    useEffect(() => {
        const random = seededRandom(67890);
        const pos = logos.map(() => {
            const u = random();
            const v = random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = 2.5 + random();
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            return new THREE.Vector3(x, y, z);
        });

        const lines: THREE.Vector3[][] = [];
        pos.forEach((p1, i) => {
            pos.forEach((p2, j) => {
                if (i !== j) {
                    const dist = p1.distanceTo(p2);
                    if (dist < 1.2) {
                        lines.push([p1, p2]);
                    }
                }
            });
        });
        setNetworkData({ positions: pos, connections: lines });
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta / 10;
        }
    });

    if (!networkData) return null;

    return (
        <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
            {networkData.positions.map((p, i) => (
                <LogoErrorBoundary key={i}>
                    <Suspense fallback={null}>
                        <LogoNode url={logos[i]} position={[p.x, p.y, p.z]} />
                    </Suspense>
                </LogoErrorBoundary>
            ))}

            {networkData.connections.map((pair, i) => (
                <Line
                    key={i}
                    points={pair}
                    color="#00f0ff"
                    opacity={0.1}
                    transparent
                    lineWidth={1}
                />
            ))}
        </group>
    );
}

export default function ThreeBackground() {
    return (
        <div className="absolute inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 2]}>
                <ParticleField />
                <NeuralNetworkCloud />
            </Canvas>
        </div>
    );
}
