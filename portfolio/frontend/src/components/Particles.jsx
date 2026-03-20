import { useState, useEffect } from 'react';

export default function Particles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2, // 2-6px particles
      dur: `${Math.random() * 8 + 6}s`, // 6-14s duration
      delay: `${Math.random() * 8}s`, // 0-8s delay
      opacity: Math.random() * 0.6 + 0.4, // 0.4-1.0 opacity (more visible)
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px', // Start below viewport
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationName: 'float',
            animationDuration: p.dur,
            animationDelay: p.delay,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
