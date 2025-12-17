"use client";
import { useRef, useMemo, Component, ReactNode, Suspense } from "react";
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
    "https://cdn.simpleicons.org/java/007396",
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

function ParticleField(props: any) {
    const ref = useRef<any>(null);
    // Generate particles in a sphere manually to avoid maath NaN issues
    const sphere = useMemo(() => {
        const count = 1500; // Decreased particle count
        const temp = new Float32Array(count * 3);
        const radius = 2.0;
        for (let i = 0; i < count; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = radius * Math.cbrt(Math.random());
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            temp[i * 3] = x;
            temp[i * 3 + 1] = y;
            temp[i * 3 + 2] = z;
        }
        return temp;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;
        }
    });

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

    // Generate static positions for logos
    const { positions, content } = useMemo(() => {
        const pos = logos.map(() => {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = 2.5 + Math.random(); // Larger radius
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            return new THREE.Vector3(x, y, z);
        });
        return { positions: pos, content: logos };
    }, []);

    // Generate connections
    const connections = useMemo(() => {
        const lines: any[] = [];
        positions.forEach((p1, i) => {
            positions.forEach((p2, j) => {
                if (i !== j) {
                    const dist = p1.distanceTo(p2);
                    if (dist < 1.2) { // Connection threshold
                        lines.push([p1, p2]);
                    }
                }
            });
        });
        return lines;
    }, [positions]);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta / 10;
        }
    });

    return (
        <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
            {/* Render Nodes */}
            {content.map((url, i) => (
                <LogoErrorBoundary key={i}>
                    <Suspense fallback={null}>
                        <LogoNode url={url} position={[positions[i].x, positions[i].y, positions[i].z]} />
                    </Suspense>
                </LogoErrorBoundary>
            ))}

            {/* Render Lines */}
            {connections.map((pair, i) => (
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
