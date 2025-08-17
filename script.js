// Navbar toggle for mobile
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ✅ Close menu only when in mobile mode
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) { // mobile breakpoint
            navLinks.classList.remove("active");
        }
    });
});

// Animated glowing particles with mouse interaction
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

window.addEventListener("resize", resizeCanvas);

let particles = [];
const mouse = { x: null, y: null };

for (let i = 0; i < 50; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 180, 216, 0.8)";
        ctx.fill();

        // Move particle
        p.x += p.dx;
        p.y += p.dy;

        // Bounce on edges
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // Mouse attraction effect
        if (mouse.x && mouse.y) {
            let dx = mouse.x - p.x;
            let dy = mouse.y - p.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                p.x -= dx / 50;
                p.y -= dy / 50;
            }
        }
    });
    requestAnimationFrame(drawParticles);
}

drawParticles();

// Track mouse position
window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Update canvas size on resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".team-card");
  let index = 0;

  function showCard(i) {
    cards.forEach(card => card.classList.remove("active"));
    cards[i].classList.add("active");
  }

  setInterval(() => {
    index = (index + 1) % cards.length;
    showCard(index);
  }, 2000); // 2 seconds

  showCard(index);
});

  // Create cursor element
  const cursor = document.createElement('div');
  cursor.classList.add('neon-cursor');
  document.body.appendChild(cursor);

  // Track mouse movement
  document.addEventListener('mousemove', e => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
  });

  // Click animation (shrink & expand)
  document.addEventListener('mousedown', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
  });
  
  document.addEventListener('mouseup', () => {
    cursor.style.width = '35px';
    cursor.style.height = '35px';
  });

  const sections = document.querySelectorAll('.fade-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // remove to fade out again
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
