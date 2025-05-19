import { useEffect, useRef } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

const GeometricParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Create particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(80, Math.floor(window.innerWidth / 25)); // More particles

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 6 + 3; // Slightly larger particles
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size,
          speedX: (Math.random() - 0.5) * 0.7, // Faster movement
          speedY: (Math.random() - 0.5) * 0.7,
          opacity: Math.random() * 0.6 + 0.2, // More visible
          type: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: triangle
          color:
            Math.random() > 0.5
              ? `rgba(33, 167, 235, ${Math.random() * 0.5 + 0.3})` // Brighter sky blue
              : `rgba(168, 85, 247, ${Math.random() * 0.5 + 0.3})`, // Brighter purple
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 0.02, // Faster rotation
        });
      }
    };

    // Draw a particle
    const drawParticle = (particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);

      switch (particle.type) {
        case 0: // Circle
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 1: // Square
          ctx.fillRect(
            -particle.size,
            -particle.size,
            particle.size * 2,
            particle.size * 2
          );
          break;
        case 2: // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -particle.size);
          ctx.lineTo(particle.size, particle.size);
          ctx.lineTo(-particle.size, particle.size);
          ctx.closePath();
          ctx.fill();
          break;
        default:
          break;
      }

      ctx.restore();
    };

    // Draw connections between nearby particles
    const drawConnections = () => {
      const maxDistance = 180; // Increased connection distance

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / maxDistance)})`; // More visible lines
            ctx.lineWidth = 1.5; // Thicker lines
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        // Boundary check with bounce effect
        if (
          particle.x - particle.size < 0 ||
          particle.x + particle.size > canvas.width
        ) {
          particle.speedX *= -1;
        }
        if (
          particle.y - particle.size < 0 ||
          particle.y + particle.size > canvas.height
        ) {
          particle.speedY *= -1;
        }

        drawParticle(particle);
      });

      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    // Debug info to check if animation is running
    console.log(
      'Geometric particles animation initialized with',
      particles.length,
      'particles'
    );

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }} // Higher z-index to ensure visibility
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
};

export default GeometricParticlesBackground;
