document.addEventListener('DOMContentLoaded', function() {
    const pond = document.getElementById('pond');
    const lilyPadsContainer = document.getElementById('lily-pads-container');
    const rocksContainer = document.getElementById('rocks-container');
    const waterPlantsContainer = document.getElementById('water-plants-container');
    const bubblesContainer = document.getElementById('bubbles-container');

    // Ensure all containers exist before proceeding
    if (!pond || !lilyPadsContainer || !rocksContainer || !waterPlantsContainer || !bubblesContainer) {
        console.error('One or more required containers not found in index.html');
        return;
    }

    // Function to create and animate bubbles
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = (0.5 + Math.random() * 1.5); // Bubble size between 0.5vw and 2vw
        bubble.style.width = `${size}vw`;
        bubble.style.height = `${size}vw`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = `-20px`; // Start below the pond
        bubblesContainer.appendChild(bubble);

        // Remove bubble after animation ends
        bubble.addEventListener('animationend', () => bubble.remove());
    }

    // Periodically create bubbles
    setInterval(createBubble, 500 + Math.random() * 1500); // Create a bubble every 0.5 to 2 seconds

    // Function to create and place lily pads
    function createLilyPads(num) {
        for (let i = 0; i < num; i++) {
            const lilyPad = document.createElement('div');
            lilyPad.classList.add('lily-pad');
            lilyPad.style.left = `${Math.random() * 90}%`;
            lilyPad.style.top = `${Math.random() * 90}%`;
            lilyPad.style.transform = `rotate(${Math.random() * 360}deg)`;
            lilyPadsContainer.appendChild(lilyPad);
        }
    }

    // Function to create and place rocks
    function createRocks(num) {
        for (let i = 0; i < num; i++) {
            const rock = document.createElement('div');
            rock.classList.add('rock');
            rock.style.left = `${Math.random() * 90}%`;
            rock.style.top = `${Math.random() * 90}%`;
            rock.style.transform = `rotate(${Math.random() * 360}deg)`;
            rocksContainer.appendChild(rock);
        }
    }

    // Function to create and place water plants
    function createWaterPlants(num) {
        for (let i = 0; i < num; i++) {
            const plant = document.createElement('div');
            plant.classList.add('water-plant');
            plant.style.left = `${Math.random() * 95}%`;
            plant.style.top = `${50 + Math.random() * 50}%`; // Plants mostly at the bottom half
            plant.style.transform = `scaleY(${0.5 + Math.random() * 0.5}) rotate(${Math.random() * 10 - 5}deg)`;
            plant.style.opacity = `${0.3 + Math.random() * 0.4}`;
            waterPlantsContainer.appendChild(plant);
        }
    }

    createLilyPads(5); // Create 5 lily pads
    createRocks(3);    // Create 3 rocks
    createWaterPlants(25); // Create 25 water plants

    const numFish = 20; // Total number of fish
    const fish = [];
    const fishTypes = ['carp', 'guppy', 'goldfish'];
    const colors = [
        { main: '#f39c12', accent: '#f1c40f' }, // Orange/Gold
        { main: '#e74c3c', accent: '#ffffff' }, // Red/White
        { main: '#3498db', accent: '#ecf0f1' }, // Blue/Silver
        { main: '#ffffff', accent: '#2c3e50' }, // White/Black (Kohaku)
        { main: '#f1c40f', accent: '#000000' }, // Yellow/Black
        { main: '#2ecc71', accent: '#ecf0f1' }, // Green/Silver
        { main: '#9b59b6', accent: '#f39c12' }, // Purple/Orange
        { main: '#1abc9c', accent: '#e74c3c' }, // Turquoise/Red
        { main: '#e67e22', accent: '#f39c12' }, // Carrot/Orange
        { main: '#34495e', accent: '#95a5a6' }, // Wet Asphalt/Silver
    ];

    class Fish {
        constructor(id, pond, color, type = 'carp') {
            this.id = id;
            this.pond = pond;
            this.color = color;
            this.type = type;
            this.element = this.createFishElement();
            this.x = Math.random() * pond.clientWidth;
            this.y = Math.random() * pond.clientHeight;
            this.angle = Math.random() * 2 * Math.PI;
            this.speed = 0.6 + Math.random() * 1.4;
            this.pond.appendChild(this.element);
            this.updatePosition();
        }

        createFishSVG() {
            let svgContent = '';
            const bodyScaleX = 0.9 + Math.random() * 0.2;
            const bodyScaleY = 0.9 + Math.random() * 0.2;
            const tailScale = 0.8 + Math.random() * 0.4;

            switch (this.type) {
                case 'carp':
                    svgContent = `
                        <g class="fish-body-group" transform="scale(${bodyScaleX}, ${bodyScaleY})">
                            <!-- Body -->
                            <path d="M 20 30 C 60 0, 100 0, 115 30 C 100 60, 60 60, 20 30" fill="url(#grad-${this.id})"/>
                            <!-- Tail -->
                            <g class="fish-tail-group" style="transform-origin: 20px 30px;">
                                <path d="M 20 30 C 10 10, -10 20, -15 30 C -10 40, 10 50, 20 30" fill="url(#grad-${this.id})" class="fish-tail-svg" transform="scale(${tailScale})"/>
                            </g>
                            <!-- Dorsal Fin -->
                            <path d="M 60 4 C 70 0, 90 2, 95 10" fill="${this.color.main}" opacity="0.7"/>
                            <!-- Eye -->
                            <circle cx="105" cy="25" r="2.5" fill="#1a1a1a" />
                        </g>
                    `;
                    break;
                case 'guppy':
                    svgContent = `
                        <g class="fish-body-group" transform="scale(${bodyScaleX * 0.6}, ${bodyScaleY * 0.6})">
                            <!-- Body -->
                            <path d="M 40 30 C 70 10, 100 10, 110 30 C 100 50, 70 50, 40 30" fill="url(#grad-${this.id})"/>
                            <!-- Tail -->
                            <g class="fish-tail-group" style="transform-origin: 30px 30px;">
                                <path d="M 40 30 C 30 10, 10 20, 5 30 C 10 40, 30 50, 40 30" fill="url(#grad-${this.id})" class="fish-tail-svg"/>
                            </g>
                            <!-- Dorsal Fin -->
                            <path d="M 70 15 C 80 10, 90 12, 95 20" fill="${this.color.main}" opacity="0.7"/>
                            <!-- Eye -->
                            <circle cx="100" cy="25" r="2" fill="#1a1a1a" />
                        </g>
                    `;
                    break;
                case 'goldfish':
                    svgContent = `
                        <g class="fish-body-group" transform="scale(${bodyScaleX * 0.8}, ${bodyScaleY * 0.8})">
                            <!-- Body -->
                            <path d="M 35 30 C 70 5, 110 5, 125 30 C 110 55, 70 55, 35 30" fill="url(#grad-${this.id})"/>
                            <!-- Tail -->
                            <g class="fish-tail-group" style="transform-origin: 25px 30px;">
                                <path d="M 35 30 C 30 10, 25 20, 22 30 C 25 40, 30 50, 35 30" fill="url(#grad-${this.id})" class="fish-tail-svg" transform="scale(${tailScale * 1.2})"/>
                            </g>
                            <!-- Dorsal Fin -->
                            <path d="M 70 10 C 80 5, 90 8, 95 15" fill="${this.color.main}" opacity="0.7"/>
                            <!-- Eye -->
                            <circle cx="115" cy="25" r="2.5" fill="#1a1a1a" />
                        </g>
                    `;
                    break;
            }

            return `
                <svg viewBox="0 0 120 60" class="fish-svg">
                    <defs>
                        <linearGradient id="grad-${this.id}" x1="0%" y1="50%" x2="100%" y2="50%">
                            <stop offset="0%" stop-color="${this.color.accent}" stop-opacity="0.8" />
                            <stop offset="100%" stop-color="${this.color.main}" />
                        </linearGradient>
                    </defs>
                    ${svgContent}
                </svg>
            `;
        }

        createFishElement() {
            const fishContainer = document.createElement('div');
            fishContainer.classList.add('fish'); // Changed from carp to fish
            fishContainer.innerHTML = this.createFishSVG();
            const size = (this.type === 'guppy' ? 2 : (this.type === 'goldfish' ? 5 : 4)) + Math.random() * (this.type === 'guppy' ? 3 : (this.type === 'goldfish' ? 4 : 6)); // Vary size based on type
            fishContainer.style.width = `${size * 2}vw`;
            fishContainer.style.height = `${size}vw`;
            return fishContainer;
        }

        move() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            // Random slight angle change for natural movement
            if (Math.random() < 0.03) {
                this.angle += (Math.random() - 0.5) * Math.PI / 4;
            }

            // Boundary avoidance
            const edgeThreshold = 100; // Pixels from edge to start turning
            const turnFactor = 0.05; // How sharply to turn

            if (this.x < edgeThreshold) {
                this.angle += turnFactor * (edgeThreshold - this.x) / edgeThreshold;
            } else if (this.x > this.pond.clientWidth - edgeThreshold) {
                this.angle -= turnFactor * (this.x - (this.pond.clientWidth - edgeThreshold)) / edgeThreshold;
            }

            if (this.y < edgeThreshold) {
                this.angle += turnFactor * (edgeThreshold - this.y) / edgeThreshold;
            } else if (this.y > this.pond.clientHeight - edgeThreshold) {
                this.angle -= turnFactor * (this.y - (this.pond.clientHeight - edgeThreshold)) / edgeThreshold;
            }

            // Keep angle within 0 to 2*PI
            this.angle = this.angle % (2 * Math.PI);
            if (this.angle < 0) this.angle += 2 * Math.PI;

            this.updatePosition();
        }

        updatePosition() {
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
            this.element.style.transform = `rotate(${this.angle * 180 / Math.PI}deg)`;
        }

        reactToClick(clickX, clickY) {
            const rect = this.element.getBoundingClientRect();
            const fishX = rect.left + rect.width / 2;
            const fishY = rect.top + rect.height / 2;
            const dx = fishX - clickX;
            const dy = fishY - clickY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 250) {
                const angleToClick = Math.atan2(dy, dx);
                this.angle = angleToClick + (Math.random() - 0.5) * 0.3;
                this.speed = 5 + Math.random() * 4;
                setTimeout(() => { this.speed = 0.6 + Math.random() * 1.4; }, 1500 + Math.random() * 1000);
            }
        }
    }

    for (let i = 0; i < numFish; i++) {
        const type = fishTypes[Math.floor(Math.random() * fishTypes.length)];
        const color = colors[i % colors.length];
        fish.push(new Fish(i, pond, color, type));
    }

    function moveFish() {
        fish.forEach(f => f.move());
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
        fish.forEach(f => f.reactToClick(clickX, clickY));
    });

    function animate() {
        moveFish();
        requestAnimationFrame(animate);
    }

    animate();
});