"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.BufferGeometry();
    const count = 900;
    const points = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      points[i] = (Math.random() - 0.5) * 90;
      points[i + 1] = (Math.random() - 0.5) * 90;
      points[i + 2] = (Math.random() - 0.5) * 90;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
    const material = new THREE.PointsMaterial({ color: 0x9f93e8, size: 0.14, transparent: true, opacity: 0.3 });
    const cloud = new THREE.Points(geometry, material);
    scene.add(cloud);

    let raf = 0;
    const animate = () => {
      cloud.rotation.y += 0.0007;
      cloud.rotation.x += 0.00025;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" className="fixed inset-0 z-0 h-full w-full pointer-events-none" />;
}
