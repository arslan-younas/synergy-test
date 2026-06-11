"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef   = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cvs = canvas; // non-null alias for use inside nested fns

    const hero = canvas.parentElement as HTMLElement;
    heroRef.current = hero;

    // WebGL check
    try {
      const c = document.createElement("canvas");
      if (!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")))) return;
    } catch { return; }

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(36, hero.clientWidth / hero.clientHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const PUR  = 0xa78bfa;
    const WARM = 0xffb877;

    const house = new THREE.Group();
    scene.add(house);

    function glassBox(w: number, h: number, d: number, x: number, y: number, z: number) {
      const g = new THREE.BoxGeometry(w, h, d);
      const m = new THREE.MeshStandardMaterial({
        color: 0x0d0d18, metalness: 0.25, roughness: 0.12,
        transparent: true, opacity: 0.5,
        emissive: 0x140f2e, emissiveIntensity: 0.6,
      });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x, y, z);
      house.add(mesh);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(g),
        new THREE.LineBasicMaterial({ color: PUR, transparent: true, opacity: 0.95 }),
      );
      edges.position.set(x, y, z);
      house.add(edges);
    }
    glassBox(3.2, 1.6, 2.4, 0, 0.8, 0);
    glassBox(2.0, 1.2, 2.4, 0.6, 2.2, 0);
    glassBox(3.4, 0.08, 2.6, 0, 1.62, 0);

    function win(w: number, h: number, x: number, y: number) {
      const p = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshStandardMaterial({ color: 0x2a1c10, emissive: WARM, emissiveIntensity: 1.1, side: THREE.DoubleSide }),
      );
      p.position.set(x, y, 1.215);
      house.add(p);
    }
    win(0.55, 0.7, -0.9, 0.85);
    win(0.55, 0.7, -0.1, 0.85);
    win(0.7,  0.55, 0.6, 2.2);
    win(0.5,  1.0,  0.95, 0.55);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(2.6, 2.66, 80),
      new THREE.MeshBasicMaterial({ color: PUR, transparent: true, opacity: 0.4, side: THREE.DoubleSide }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.RingGeometry(3.3, 3.33, 90),
      new THREE.MeshBasicMaterial({ color: PUR, transparent: true, opacity: 0.18, side: THREE.DoubleSide }),
    );
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.y = 0.01;
    scene.add(ring2);

    scene.add(new THREE.AmbientLight(0x3a3a52, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 0.7);
    key.position.set(4, 6, 5);
    scene.add(key);
    const pUp = new THREE.PointLight(PUR, 12, 14);
    pUp.position.set(-2, 4, 2);
    scene.add(pUp);
    const pIn = new THREE.PointLight(WARM, 8, 8);
    pIn.position.set(0, 1, 0.4);
    scene.add(pIn);

    const camBaseZ = 8.2, camBaseY = 3.4;
    camera.position.set(5.2, camBaseY, camBaseZ);

    let rotY = -0.5, dragRot = 0;
    let dragging = false, lastX = 0, idle = 0;
    let tpX = 0, tpY = 0, pX = 0, pY = 0, scrollP = 0;

    function size() {
      camera.aspect = hero.clientWidth / hero.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(hero.clientWidth, hero.clientHeight, false);
    }
    size();

    function onDown(e: MouseEvent | TouchEvent) {
      dragging = true;
      cvs.style.cursor = "grabbing";
      const t = "touches" in e ? e.touches[0] : e;
      lastX = t.clientX;
    }
    function onMove(e: MouseEvent | TouchEvent) {
      const t = "touches" in e ? e.touches[0] : e;
      const r = hero.getBoundingClientRect();
      tpX = (t.clientX - r.left) / r.width - 0.5;
      tpY = (t.clientY - r.top)  / r.height - 0.5;
      if (!dragging) return;
      dragRot += (t.clientX - lastX) * 0.006;
      lastX = t.clientX;
      idle = 0;
    }
    function onUp() {
      dragging = false;
      cvs.style.cursor = "grab";
    }
    function onScroll() {
      const h = hero.offsetHeight || window.innerHeight;
      scrollP = Math.max(0, Math.min(1, window.scrollY / h));
    }

    cvs.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    cvs.addEventListener("touchstart", onDown as EventListener, { passive: true });
    cvs.addEventListener("touchmove",  onMove as EventListener, { passive: true });
    cvs.addEventListener("touchend",   onUp);
    window.addEventListener("resize", size);
    window.addEventListener("scroll", onScroll, { passive: true });

    let running = true;
    let first   = true;

    function frame() {
      if (!dragging) { idle += 0.016; if (idle > 1.4) rotY += 0.0024; }
      house.rotation.y = rotY + dragRot;
      ring.rotation.z  += 0.002;
      ring2.rotation.z -= 0.0013;
      pX += (tpX - pX) * 0.05;
      pY += (tpY - pY) * 0.05;
      const z = camBaseZ - scrollP * 3.4;
      const y = camBaseY - scrollP * 1.1 + pY * 0.6;
      camera.position.set(5.2 + pX * 1.2, y, z);
      camera.lookAt(0, 1.2 + scrollP * 0.2, 0);
      renderer.render(scene, camera);
      if (first) { first = false; cvs.style.opacity = "1"; }
    }

    let rafId: number;
    const loop = () => {
      if (running) frame();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onVisibility = () => { running = !document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => { running = es[0].isIntersecting; });
      io.observe(hero);
    }

    return () => {
      cancelAnimationFrame(rafId);
      cvs.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      cvs.removeEventListener("touchstart", onDown as EventListener);
      cvs.removeEventListener("touchmove",  onMove as EventListener);
      cvs.removeEventListener("touchend",   onUp);
      window.removeEventListener("resize", size);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-[1] h-full w-full touch-pan-y"
      style={{ opacity: 0, transition: "opacity 1.4s ease", cursor: "grab" }}
    />
  );
}
