import React, { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Re-calculate screen sizes
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle objects
    const fireflies = [];
    const stars = [];
    const clouds = [];
    const butterflies = [];

    // Initialize Twinkling Stars
    const starCount = 60;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.6, // keep in upper sky
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    // Initialize Fireflies (Layer 8)
    const fireflyCount = 25;
    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.5 + 0.3,
        glowRadius: Math.random() * 10 + 5,
        freq: Math.random() * 0.05 + 0.01,
      });
    }

    // Initialize Butterflies (Layer 7)
    const butterflyCount = 5;
    for (let i = 0; i < butterflyCount; i++) {
      butterflies.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.7 + height * 0.1,
        size: Math.random() * 4 + 4,
        speedX: Math.random() * 0.8 + 0.4,
        speedY: (Math.random() - 0.5) * 0.6,
        wingAngle: 0,
        wingSpeed: Math.random() * 0.15 + 0.1,
        color: ['#fcd34d', '#f472b6', '#38bdf8', '#fb7185'][Math.floor(Math.random() * 4)],
      });
    }

    // Initialize slow moving clouds (Layer 2)
    const cloudCount = 4;
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * width - 200,
        y: Math.random() * height * 0.3 + 50,
        size: Math.random() * 150 + 100,
        speed: Math.random() * 0.05 + 0.02,
        opacity: Math.random() * 0.08 + 0.04,
      });
    }

    const animate = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Layer 1: Dark sky gradient background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#060303');
      skyGrad.addColorStop(0.5, '#0e0807');
      skyGrad.addColorStop(1, '#1b0e0a');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Layer 3: Golden sunlight beam from top right
      const lightGrad = ctx.createRadialGradient(
        width * 0.85, 0, 10,
        width * 0.85, 0, Math.max(width, height) * 0.8
      );
      lightGrad.addColorStop(0, 'rgba(253, 230, 138, 0.08)');
      lightGrad.addColorStop(0.5, 'rgba(217, 119, 6, 0.03)');
      lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw Twinkling Stars (Layer 9)
      stars.forEach((s) => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0.2) {
          s.speed = -s.speed;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Clouds (Layer 2)
      clouds.forEach((c) => {
        c.x += c.speed;
        if (c.x > width + 200) {
          c.x = -200;
        }
        ctx.fillStyle = `rgba(253, 230, 138, ${c.opacity})`;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.arc(c.x + c.size * 0.5, c.y - c.size * 0.2, c.size * 0.8, 0, Math.PI * 2);
        ctx.arc(c.x - c.size * 0.5, c.y - c.size * 0.1, c.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Lord Jagannath Temple Silhouette (Layer 1 - blurred backdrop)
      drawTemple(ctx);

      // Draw Bokeh Lights (Layer 6)
      drawBokeh(ctx, time);

      // Draw Butterflies (Layer 7)
      butterflies.forEach((b) => {
        b.x += b.speedX;
        b.y += b.speedY;
        b.wingAngle += b.wingSpeed;

        if (b.x > width + 50) {
          b.x = -50;
          b.y = Math.random() * height * 0.7 + height * 0.1;
        }
        if (b.y < 0 || b.y > height) {
          b.speedY = -b.speedY;
        }

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.fillStyle = b.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = b.color;

        // Draw left wing (scales horizontally with wingAngle)
        const scaleX = Math.abs(Math.sin(b.wingAngle));
        ctx.beginPath();
        ctx.ellipse(-b.size * 0.8 * scaleX, -b.size * 0.5, b.size * scaleX, b.size * 1.2, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Draw right wing
        ctx.beginPath();
        ctx.ellipse(b.size * 0.8 * scaleX, -b.size * 0.5, b.size * scaleX, b.size * 1.2, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.fillStyle = '#1e1b4b';
        ctx.beginPath();
        ctx.ellipse(0, 0, 1.5, b.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Draw Fireflies (Layer 8)
      fireflies.forEach((f) => {
        f.angle += (Math.random() - 0.5) * 0.1;
        f.x += Math.cos(f.angle) * f.speed;
        f.y += Math.sin(f.angle) * f.speed;

        // Keep inside bounds
        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
        if (f.y < 0) f.y = height;
        if (f.y > height) f.y = 0;

        const currentAlpha = (Math.sin(time * f.freq) + 1.2) * 0.4 * f.alpha;

        ctx.save();
        const radGrad = ctx.createRadialGradient(f.x, f.y, 0.5, f.x, f.y, f.glowRadius);
        radGrad.addColorStop(0, `rgba(253, 230, 138, ${currentAlpha})`);
        radGrad.addColorStop(0.3, `rgba(245, 158, 11, ${currentAlpha * 0.3})`);
        radGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.glowRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Draw stylized Jagannath Temple silhouette (Low opacity, elegant gold lines)
    function drawTemple(ctx) {
      ctx.save();
      ctx.globalAlpha = 0.06; // transparent enough to not distract
      ctx.fillStyle = '#fbbf24';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#fbbf24';

      const templeW = Math.min(width * 0.5, 380);
      const templeH = templeW * 1.5;
      const templeX = width * 0.5 - templeW * 0.5;
      const templeY = height - templeH - 20;

      // Base structures
      ctx.fillRect(templeX + templeW * 0.1, templeY + templeH * 0.8, templeW * 0.8, templeH * 0.2);
      ctx.fillRect(templeX + templeW * 0.2, templeY + templeH * 0.6, templeW * 0.6, templeH * 0.2);

      // Principal spire (Shikhara / Deula)
      ctx.beginPath();
      ctx.moveTo(templeX + templeW * 0.35, templeY + templeH * 0.6);
      
      // Curved left profile of spire
      ctx.quadraticCurveTo(
        templeX + templeW * 0.4, templeY + templeH * 0.2,
        templeX + templeW * 0.47, templeY + templeH * 0.05
      );
      // Small neck and top ring (Amalaka)
      ctx.lineTo(templeX + templeW * 0.53, templeY + templeH * 0.05);
      
      // Curved right profile of spire
      ctx.quadraticCurveTo(
        templeX + templeW * 0.6, templeY + templeH * 0.2,
        templeX + templeW * 0.65, templeY + templeH * 0.6
      );
      ctx.closePath();
      ctx.fill();

      // Amalaka (wheel neck) and Neela Chakra (golden wheel)
      const cx = templeX + templeW * 0.5;
      const cy = templeY + templeH * 0.04;
      ctx.beginPath();
      ctx.arc(cx, cy, templeW * 0.04, 0, Math.PI * 2);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#fbbf24';
      ctx.stroke();

      // Flag (Patita Pavana) flapping left
      ctx.beginPath();
      ctx.moveTo(cx, cy - templeW * 0.04);
      ctx.lineTo(cx, cy - templeW * 0.12);
      ctx.lineTo(cx - templeW * 0.08, cy - templeW * 0.09);
      ctx.lineTo(cx, cy - templeW * 0.07);
      ctx.closePath();
      ctx.fill();

      // Left secondary temple tower (Jagamohana)
      ctx.beginPath();
      ctx.moveTo(templeX + templeW * 0.15, templeY + templeH * 0.8);
      ctx.quadraticCurveTo(
        templeX + templeW * 0.2, templeY + templeH * 0.5,
        templeX + templeW * 0.28, templeY + templeH * 0.4
      );
      ctx.lineTo(templeX + templeW * 0.32, templeY + templeH * 0.4);
      ctx.quadraticCurveTo(
        templeX + templeW * 0.35, templeY + templeH * 0.5,
        templeX + templeW * 0.38, templeY + templeH * 0.8
      );
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    // Draw Bokeh Lights
    function drawBokeh(ctx, time) {
      ctx.save();
      const count = 12;
      for (let i = 0; i < count; i++) {
        const speed = 0.0001 * (i + 1);
        const yOffset = Math.sin(time * speed + i) * 60;
        const x = ((width / count) * i + time * 0.015) % (width + 100) - 50;
        const y = (height * 0.6 + yOffset + (i * 20)) % height;
        const size = Math.sin(time * 0.001 + i) * 20 + 35;

        ctx.beginPath();
        ctx.arc(x, y, Math.max(5, size), 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(x, y, 0, x, y, Math.max(5, size));
        grad.addColorStop(0, 'rgba(253, 230, 138, 0.04)');
        grad.addColorStop(0.7, 'rgba(245, 158, 11, 0.01)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fill();
      }
      ctx.restore();
    }

    animate(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 object-cover"
    />
  );
}
