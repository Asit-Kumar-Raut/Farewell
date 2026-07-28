import React, { useEffect, useRef } from 'react';

export default function FlowerRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const petals = [];
    const petalCount = 45; // balanced for performance
    
    // Different types of petals with unique colors & shapes
    // 🌹 Rose (red), 🌸 Cherry Blossom (pink), 🌼 Marigold (gold/orange), 🪷 Lotus (magenta/pink)
    const types = [
      { color: '#ef4444', size: 8, shape: 'rose' },      // Rose (Red)
      { color: '#fbcfe8', size: 6, shape: 'cherry' },    // Cherry blossom (Light pink)
      { color: '#f59e0b', size: 9, shape: 'marigold' },  // Marigold (Golden orange)
      { color: '#ec4899', size: 7, shape: 'lotus' },     // Lotus (Vibrant pink)
      { color: '#fef08a', size: 7, shape: 'gold' },      // Gold petal
    ];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, radius: 150 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize Petals
    for (let i = 0; i < petalCount; i++) {
      petals.push(createPetal(true));
    }

    function createPetal(randomY = false) {
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -20,
        size: Math.random() * type.size + 4,
        color: type.color,
        shape: type.shape,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: Math.random() * 1.5 + 1.0,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: Math.random() * 0.4 + 0.5,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayRange: Math.random() * 20 + 10,
        swayOffset: Math.random() * 100,
      };
    }

    // Drawing petal shapes on canvas
    function drawPetalShape(ctx, p) {
      ctx.beginPath();
      switch (p.shape) {
        case 'rose':
          // Heart-ish shaped rose petal
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-p.size, -p.size, -p.size * 1.5, p.size / 2, 0, p.size * 1.5);
          ctx.bezierCurveTo(p.size * 1.5, p.size / 2, p.size, -p.size, 0, 0);
          break;
        case 'cherry':
          // Standard cherry blossom tear shape with notch
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-p.size, -p.size, -p.size, p.size, 0, p.size * 1.2);
          ctx.bezierCurveTo(p.size, p.size, p.size, -p.size, 0, 0);
          break;
        case 'marigold':
          // Rounder frilly petal
          ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
          break;
        case 'lotus':
          // Pointed ellipse lotus petal
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(-p.size * 0.6, 0, 0, p.size);
          ctx.quadraticCurveTo(p.size * 0.6, 0, 0, -p.size);
          break;
        default:
          // Simple oval leaflet
          ctx.ellipse(0, 0, p.size * 1.2, p.size * 0.6, 0, 0, Math.PI * 2);
      }
      ctx.fill();
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p, idx) => {
        // Apply wind and gravity
        p.y += p.speedY;
        
        // Sway back and forth using sine wave
        p.swayOffset += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayOffset) * 0.3;
        
        // Rotate petal
        p.rotation += p.rotationSpeed;

        // Interactive mouse push
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 5;
          p.y += (dy / dist) * force * 3;
        }

        // Reset if offscreen
        if (p.y > height + 20 || p.x < -20 || p.x > width + 20) {
          petals[idx] = createPetal(false);
          return;
        }

        // Render petal
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        // Shadow glow effect
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;

        drawPetalShape(ctx, p);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[80]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
