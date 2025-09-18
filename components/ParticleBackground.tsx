import React, { useRef, useEffect } from 'react';

const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let particles: Particle[] = [];
        const particleCount = 40;
        
        const mouse = {
            x: -1000,
            y: -1000,
            radius: 150
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        // Use window/document for events since canvas is in the background and won't receive them
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);


        class Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
            density: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() * 1 - 0.5);
                this.speedY = (Math.random() * 1 - 0.5);
                const rand = Math.random();
                this.color = rand < 0.45 ? '#F97316' : rand < 0.9 ? '#2DD4BF' : '#FFFFFF'; // Orange, Cyan, White mix
                this.density = (Math.random() * 30) + 1;
            }

            draw() {
                if(!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                 // Add a subtle glow
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;
            }

            update() {
                // Check mouse collision
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 0 && distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    
                    let directionX = (forceDirectionX * force * this.density);
                    let directionY = (forceDirectionY * force * this.density);
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Return to base position
                    if (this.x !== this.baseX) {
                        let dxReturn = this.x - this.baseX;
                        this.x -= dxReturn/10;
                    }
                     if (this.y !== this.baseY) {
                        let dyReturn = this.y - this.baseY;
                        this.y -= dyReturn/10;
                    }
                }

                // Move particle
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x + this.size > width || this.x - this.size < 0) {
                    this.speedX *= -1;
                }
                if (this.y + this.size > height || this.y - this.size < 0) {
                    this.speedY *= -1;
                }
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        let animationFrameId: number;
        const animate = () => {
            if(!ctx) return;
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        
        init();
        animate();

        // Cleanup function to remove event listeners on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };

    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ParticleBackground;