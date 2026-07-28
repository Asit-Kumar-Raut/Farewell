import React, { useEffect, useRef } from 'react';

export default function ParticleTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const maxParticles = 60;
    const colors = ['#fde68a', '#fbbf24', '#f59e0b', '#d97706', '#ffffff'];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = { x: null, y: null };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Spawn a few particles on move
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5 - 0.5, // drift up
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 1,
          decay: Math.random() * 0.02 + 0.01,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Also draw a custom cursor follow dot
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorOuter = document.createElement('div');
    cursorOuter.className = 'custom-cursor';
    document.body.appendChild(cursorOuter);

    const updateCursor = (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      
      // Delay the outer ring slightly for a trailing effect
      cursorOuter.animate(
        {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`
        },
        { duration: 150, fill: 'forwards' }
      );
    };

    window.addEventListener('mousemove', updateCursor);

    // Animation Loop
    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= p.decay;
        p.alpha = p.life;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;

        // Draw star-like shape or circles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Constrain particle array size
      if (particles.length > maxParticles) {
        particles.splice(0, particles.length - maxParticles);
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', updateCursor);
      cancelAnimationFrame(animationFrameId);
      if (cursorDot.parentNode) cursorDot.parentNode.removeChild(cursorDot);
      if (cursorOuter.parentNode) cursorOuter.parentNode.removeChild(cursorOuter);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
