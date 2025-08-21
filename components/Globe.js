"use client";
import { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion, useMotionValue, useTransform } from 'framer-motion';

function OrbitItem({ label, href, radius, speed, phase = 0, tilt = 0.3, depth = 0.6, centerX = 0, centerY = 0, zIndexBase = 20 }) {
  const t = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const z = useMotionValue(0);

  const scale = useTransform(z, [-1, 1], [0.85, 1.15]);
  const opacity = useTransform(z, [-1, 1], [0.7, 1]);
  const blurAmount = useTransform(z, [-1, 1], [1.2, 0]);
  const filter = useTransform(blurAmount, (b) => `blur(${b}px)`);
  const zIndex = useTransform(z, [-1, 1], [zIndexBase - 2, zIndexBase + 2]);

  useEffect(() => {
    let rafId;
    let last = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const loop = (now) => {
      const current = typeof now === 'number' ? now : (typeof performance !== 'undefined' ? performance.now() : Date.now());
      const dt = Math.min(0.05, Math.max(0, (current - last) / 1000));
      last = current;

      const nextT = t.get() + speed * dt;
      t.set(nextT);

      const angle = nextT + phase;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const px = radius * cosA;
      const py = radius * sinA * Math.cos(tilt);
      const pz = Math.sin(angle) * depth; // -1..1

      x.set(centerX + px);
      y.set(centerY + py);
      z.set(pz);

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [centerX, centerY, depth, phase, radius, speed, tilt, t, x, y]);

  const boxShadow = useTransform(z, [-1, 1], [
    '0 0 16px rgba(212,175,55,0.15)',
    '0 0 24px rgba(249,210,157,0.35)'
  ]);

  return (
    <motion.a
      href={href}
      className="absolute left-1/2 top-1/2"
      style={{
        x,
        y,
        scale,
        opacity,
        zIndex,
        filter,
      }}
      transformTemplate={({ transform }) => `translate(-50%, -50%) ${transform}`}
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
      aria-label={label}
    >
      <motion.div
        className="px-3 py-2 rounded-xl border border-border-light bg-surface-dark/60 backdrop-blur text-text-primary text-xs md:text-sm shadow-glow"
        style={{ boxShadow }}
        whileHover={{ boxShadow: '0 0 32px rgba(249,210,157,0.55)' }}
      >
        {label}
      </motion.div>
    </motion.a>
  );
}

export default function Globe() {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const isCompact = size.width > 0 && size.width < 480;

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create wireframe sphere
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
      color: 0xd4af37, 
      transparent: true, 
      opacity: 0.6 
    });
    
    // Create wireframe from edges
    const edges = new THREE.EdgesGeometry(sphereGeometry);
    const wireframe = new THREE.LineSegments(edges, wireframeMaterial);
    scene.add(wireframe);

    // Create nodes (achievement points)
    const nodes = [];
    const nodePositions = [
      { x: 1.5, y: 1.2, z: 0.8 },
      { x: -1.8, y: 0.5, z: 1.0 },
      { x: 0.5, y: -1.8, z: 0.9 },
      { x: 1.2, y: 0.3, z: -1.5 },
      { x: -0.8, y: 1.5, z: -1.2 },
      { x: -1.0, y: -1.0, z: -1.0 }
    ];

    nodePositions.forEach((pos, index) => {
      const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const nodeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xf9d29d,
        transparent: true,
        opacity: 0.8
      });
      
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(pos.x, pos.y, pos.z);
      node.userData = { index };
      
      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(0.12, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xd4af37,
        transparent: true,
        opacity: 0.3
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      node.add(glow);
      
      scene.add(node);
      nodes.push(node);
    });

    // Add connecting lines from nodes to sphere surface
    nodes.forEach((node, index) => {
      const direction = node.position.clone().normalize();
      const surfacePoint = direction.multiplyScalar(2);
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        node.position,
        surfacePoint
      ]);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0xd4af37, 
        transparent: true, 
        opacity: 0.4 
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    });

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Rotate the entire scene
      scene.rotation.y += 0.005;
      scene.rotation.x += 0.002;
      
      // Animate nodes with subtle floating motion
      nodes.forEach((node, index) => {
        const time = Date.now() * 0.001;
        node.position.y += Math.sin(time + index) * 0.001;
        node.rotation.y += 0.01;
      });
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      const parent = containerRef.current;
      if (parent) {
        setSize({ width: parent.clientWidth, height: parent.clientHeight });
      }
    };

    window.addEventListener('resize', handleResize);
    // initial size
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const radius = useMemo(() => {
    const base = Math.min(size.width || 600, (size.height || 400)) / 2;
    const r = Math.max(80, base - 90);
    return isCompact ? Math.max(60, r - 30) : r;
  }, [size, isCompact]);

  return (
    <div ref={containerRef} className="relative w-full h-96 md:h-[500px] flex items-center justify-center">
      <div 
        ref={mountRef} 
        className="w-full h-full"
        style={{ position: 'relative' }}
      />

      {/* Overlay text */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h2 className="text-2xl md:text-3xl font-elegant text-accent-gold mb-2">
          Mappamundi
        </h2>
        <p className="text-sm md:text-base font-modern text-text-secondary">
          A celestial cartography of achievements and connections
        </p>
      </div>

      {/* Orbiting interactive items */}
      {!isCompact && (
        <>
          <OrbitItem label="Projects" href="#projects" radius={radius} speed={0.6} phase={0} tilt={0.35} depth={0.9} />
          <OrbitItem label="Skills" href="#skills" radius={radius * 0.92} speed={0.48} phase={Math.PI / 2} tilt={0.25} depth={0.7} />
          <OrbitItem label="About" href="#about" radius={radius * 0.84} speed={0.52} phase={Math.PI} tilt={0.3} depth={0.8} />
          <OrbitItem label="Contact" href="#contact" radius={radius * 0.76} speed={0.56} phase={(3 * Math.PI) / 2} tilt={0.2} depth={0.6} />
        </>
      )}

      {/* Compact layout: stack neatly at bottom */}
      {isCompact && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-2">
          {[
            { label: 'Projects', href: '#projects' },
            { label: 'Skills', href: '#skills' },
            { label: 'About', href: '#about' },
            { label: 'Contact', href: '#contact' },
          ].map(item => (
            <a key={item.label} href={item.href} className="px-3 py-2 rounded-xl border border-border-light bg-surface-dark/60 backdrop-blur text-text-primary text-xs shadow-soft hover:shadow-glow hover:text-accent-amber transition">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
