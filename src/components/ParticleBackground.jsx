import React from "react";

// Animated particle-network background, adapted from the 21st.dev
// "Aether Flow" component by @dhiluxui. Converted to JSX and stripped down
// to JUST the canvas background — no headline, no button — so it sits behind
// your own hero content.
//
// Renders as an absolutely-positioned layer. Wrap your hero in a `relative`
// parent and put your content in a `relative z-10` child so it sits on top.
//
// Tuned to TaskIQ's palette: emerald/white particles instead of purple,
// so it matches the rest of the site.
export default function ParticleBackground() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 180 };

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Push particles gently away from the cursor.
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 4;
            this.y -= forceDirectionY * force * 4;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particles = [];
      // Density scales with canvas area. Higher divisor = fewer particles
      // = better performance. 11000 is a touch lighter than the original.
      const numberOfParticles = (canvas.height * canvas.width) / 11000;
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - size * 4) + size * 2;
        const y = Math.random() * (canvas.height - size * 4) + size * 2;
        const directionX = Math.random() * 0.4 - 0.2;
        const directionY = Math.random() * 0.4 - 0.2;
        // Emerald-white dots to match TaskIQ's accent.
        const color = "rgba(167, 243, 208, 0.7)";
        particles.push(
          new Particle(x, y, directionX, directionY, size, color)
        );
      }
    }

    const resizeCanvas = () => {
      // Full viewport — this is a page-wide background, not scoped to a section.
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance =
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2;

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            const opacityValue = 1 - distance / 20000;

            let nearMouse = false;
            if (mouse.x !== null) {
              const dxm = particles[a].x - mouse.x;
              const dym = particles[a].y - mouse.y;
              const distMouse = Math.sqrt(dxm * dxm + dym * dym);
              nearMouse = distMouse < mouse.radius;
            }

            // Lines brighten near the cursor.
            ctx.strokeStyle = nearMouse
              ? `rgba(255, 255, 255, ${opacityValue})`
              : `rgba(110, 231, 183, ${opacityValue * 0.5})`;

            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      // Clear instead of painting black — lets the page's own dark
      // background (and gradients) show through behind the particles.
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
    };

    const handleMouseMove = (event) => {
      // Canvas is fixed to the viewport, so client coords map directly.
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Respect reduced-motion preference — render one static frame, no loop.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    resizeCanvas();

    if (prefersReducedMotion) {
      // Draw a single static frame and stop.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.draw());
      connect();
    } else {
      animate();
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  );
}