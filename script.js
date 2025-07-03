document.addEventListener('DOMContentLoaded', function() {
    const pond = document.getElementById('pond');
    if (!pond) { return; }

    const numCarps = 12;
    const carps = [];
    const colors = [
        { main: '#f39c12', accent: '#f1c40f' }, // Orange/Gold
        { main: '#e74c3c', accent: '#ffffff' }, // Red/White
        { main: '#3498db', accent: '#ecf0f1' }, // Blue/Silver
        { main: '#ffffff', accent: '#2c3e50' }, // White/Black (Kohaku)
        { main: '#f1c40f', accent: '#000000' }, // Yellow/Black
    ];

    function createCarpSVG(id, color) {
        return `
            <svg viewBox="0 0 120 60" class="carp-svg">
                <defs>
                    <linearGradient id="grad-${id}" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stop-color="${color.accent}" stop-opacity="0.8" />
                        <stop offset="100%" stop-color="${color.main}" />
                    </linearGradient>
                </defs>
                <g class="carp-body-group">
                    <!-- Tail -->
                    <path d="M 0 30 C 25 10, 25 50, 0 30" fill="url(#grad-${id})" class="carp-tail-svg"/>
                    <!-- Body -->
                    <path d="M 20 30 C 60 0, 100 0, 115 30 C 100 60, 60 60, 20 30" fill="url(#grad-${id})"/>
                    <!-- Dorsal Fin -->
                    <path d="M 60 4 C 70 0, 90 2, 95 10" fill="${color.main}" opacity="0.7"/>
                    <!-- Eye -->
                    <circle cx="105" cy="25" r="2.5" fill="#1a1a1a" />
                </g>
            </svg>
        `;
    }

    for (let i = 0; i < numCarps; i++) {
        const carpContainer = document.createElement('div');
        carpContainer.classList.add('carp');
        const color = colors[i % colors.length];
        carpContainer.innerHTML = createCarpSVG(i, color);
        pond.appendChild(carpContainer);

        const size = 40 + Math.random() * 60;
        carpContainer.style.width = `${size * 2}px`;
        carpContainer.style.height = `${size}px`;

        carps.push({
            element: carpContainer,
            x: Math.random() * pond.clientWidth,
            y: Math.random() * pond.clientHeight,
            angle: Math.random() * 2 * Math.PI,
            speed: 0.6 + Math.random() * 1.4,
        });
    }

    // ... (rest of the logic remains the same)
    function moveCarps() {
        carps.forEach(carp => {
            carp.x += Math.cos(carp.angle) * carp.speed;
            carp.y += Math.sin(carp.angle) * carp.speed;

            if (Math.random() < 0.03) {
                carp.angle += (Math.random() - 0.5) * Math.PI / 4;
            }

            if (carp.x < -150 || carp.x > pond.clientWidth + 150 || carp.y < -100 || carp.y > pond.clientHeight + 100) {
                carp.angle += Math.PI;
            }

            carp.element.style.left = carp.x + 'px';
            carp.element.style.top = carp.y + 'px';
            carp.element.style.transform = `rotate(${carp.angle * 180 / Math.PI}deg)`;
        });
    }

    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        pond.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    }

    pond.addEventListener('click', (e) => {
        createRipple(e.clientX, e.clientY);
        const clickX = e.clientX;
        const clickY = e.clientY;
        carps.forEach(carp => {
            const rect = carp.element.getBoundingClientRect();
            const carpX = rect.left + rect.width / 2;
            const carpY = rect.top + rect.height / 2;
            const dx = carpX - clickX;
            const dy = carpY - clickY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 250) {
                const angleToClick = Math.atan2(dy, dx);
                carp.angle = angleToClick + (Math.random() - 0.5) * 0.3;
                carp.speed = 5 + Math.random() * 4;
                setTimeout(() => { carp.speed = 0.6 + Math.random() * 1.4; }, 1500 + Math.random() * 1000);
            }
        });
    });

    setInterval(moveCarps, 50);
});