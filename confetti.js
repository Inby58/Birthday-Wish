// ==========================================
// 🎊 HIGH-PERFORMANCE CANVAS CONFETTI SYSTEM
// Supports bursts, cannons, sparkles & 3D rotating confetti pieces
// ==========================================

class ConfettiEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationFrame = null;
    this.colors = [
      '#ff758c', '#ff7eb3', '#f6d365', '#fda085',
      '#e0a899', '#f7d794', '#ffd369', '#a8ff78',
      '#78ffd6', '#f4c2c2', '#ffffff', '#e84393'
    ];
    this.init();
  }

  init() {
    this.canvas = document.getElementById('confetti-canvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'confetti-canvas';
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '9999';
      document.body.appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth * window.devicePixelRatio;
    this.canvas.height = window.innerHeight * window.devicePixelRatio;
    if (this.ctx) {
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }

  burst(x, y, count = 45) {
    const originX = x !== undefined ? x : window.innerWidth / 2;
    const originY = y !== undefined ? y : window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 9;
      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: 6 + Math.random() * 8,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        tilt: Math.random() * 10,
        tiltSpeed: 0.1 + Math.random() * 0.15,
        opacity: 1,
        decay: 0.008 + Math.random() * 0.012,
        shape: Math.random() > 0.35 ? 'rect' : (Math.random() > 0.5 ? 'circle' : 'star')
      });
    }

    if (!this.animationFrame) {
      this.loop();
    }
  }

  cannon() {
    // Left cannon
    this.burst(window.innerWidth * 0.15, window.innerHeight * 0.85, 45);
    // Right cannon
    this.burst(window.innerWidth * 0.85, window.innerHeight * 0.85, 45);
    // Center burst
    setTimeout(() => {
      this.burst(window.innerWidth * 0.5, window.innerHeight * 0.45, 60);
    }, 200);
  }

  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Physics update
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.vx *= 0.98; // air drag
      p.rotation += p.rotationSpeed;
      p.tilt += p.tiltSpeed;
      p.opacity -= p.decay;

      if (p.opacity <= 0 || p.y > window.innerHeight + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);

      this.ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.shape === 'star') {
        this.drawStar(0, 0, 5, p.size * 0.8, p.size * 0.4);
      } else {
        const tiltW = Math.sin(p.tilt) * p.size;
        this.ctx.fillRect(-tiltW / 2, -p.size / 2, tiltW, p.size);
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationFrame = requestAnimationFrame(() => this.loop());
    } else {
      this.animationFrame = null;
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      this.ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      this.ctx.lineTo(x, y);
      rot += step;
    }
    this.ctx.lineTo(cx, cy - outerRadius);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

// Global instance
window.birthdayConfetti = new ConfettiEngine();
