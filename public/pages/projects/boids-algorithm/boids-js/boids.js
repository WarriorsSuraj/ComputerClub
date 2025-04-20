/*
README:

https://www.red3d.com/cwr/boids/
https://en.wikipedia.org/wiki/Boids

*/

/*
for boid in boids:
    neighbors = get_neighbors(boid, view_radius)
    cohesion = average_position(neighbors) - boid.position
    alignment = average_velocity(neighbors)
    separation = sum((boid.position - n.position) / distance(boid, n) for n in neighbors if too_close(boid, n))
    boid.velocity += w1 * cohesion + w2 * alignment + w3 * separation
    clamp(boid.velocity, max_speed)
    boid.position += boid.velocity * dt
*/

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const [screenWidth, screenHeight] = [canvas.width, canvas.height];
const maxSpeed = 100;
const viewRange = 50;
const avoidDist = 20;

class Boid {
    constructor() {
        this.x = Math.random() * screenWidth;
        this.y = Math.random() * screenHeight;

        this.xvel = (Math.random() - 0.5) * maxSpeed;
        this.yvel = (Math.random() - 0.5) * maxSpeed;
    }
}

const boids = [];
for (let i = 0; i < 200; i++) {
    boids.push(new Boid());
}

function avg_pos(my, boids) {
    let x = 0;
    let y = 0;

    if(!boids.length) return {x: 0, y: 0};

    for (const boid of boids) {
        x += boid.x;
        y += boid.y;
    }

    x /= boids.length;
    y /= boids.length;

    return {
        x: (x - my.x) * 0.01,
        y: (y - my.y) * 0.01
    }
}

function avg_vel(boids) {
    if (!boids.length) return { x: 0, y: 0 };

    let x = 0;
    let y = 0;
    for (const boid of boids) {
        x += boid.xvel;
        y += boid.yvel;
    }

    x /= boids.length;
    y /= boids.length;

    const mag = Math.hypot(x, y);
    if (mag) {
        x = (x / mag) * maxSpeed * 0.05;
        y = (y / mag) * maxSpeed * 0.05;
    }

    return { x, y };
}

function avoid_boids(my, boids) {
    let x = 0;
    let y = 0;

    for (const boid of boids) {
        const dist = Math.hypot(boid.x - my.x, boid.y - my.y);

        if (dist > 0 && dist < avoidDist) {
            const diffx = my.x - boid.x;
            const diffy = my.y - boid.y;
            const scale = (avoidDist - dist) / (dist * avoidDist);

            x += diffx * scale;
            y += diffy * scale;
        }
    }

    // normalize
    const mag = Math.hypot(x, y);
    if(mag) {
        x = (x / mag) * maxSpeed * 0.1;
        y = (y / mag) * maxSpeed * 0.1;
    }

    return {
        x: x,
        y: y
    }
}

let cohesionweight = 0.5;
let alignmentweight = 0.5;
let separationweight = 1.5;
function updateloop(delta) {
    delta /= 250;

    for (const boid of boids) {
        const neighbors = boids.filter((n) => n !== boid && Math.hypot(n.x - boid.x, n.y - boid.y) <= viewRange);
        const cohesion = avg_pos(boid, neighbors);
        const alignment = avg_vel(neighbors);
        const separation = avoid_boids(boid, neighbors);

        boid.xvel += (cohesionweight * cohesion.x) + (alignmentweight * alignment.x) + (separationweight * separation.x);
        boid.yvel += (cohesionweight * cohesion.y) + (alignmentweight * alignment.y) + (separationweight * separation.y);

        // limit speed (so they don't go flying off)
        const speed = Math.sqrt(boid.xvel ** 2 + boid.yvel ** 2);
        if (speed > maxSpeed) {
            boid.xvel = (boid.xvel / speed) * maxSpeed;
            boid.yvel = (boid.yvel / speed) * maxSpeed;
        }

        // update pos
        boid.x += boid.xvel * delta;
        boid.y += boid.yvel * delta;

        // warp around edges
        /*
        if (boid.x < 0) boid.x += screenWidth;
        if (boid.x > screenWidth) boid.x -= screenWidth;
        if (boid.y < 0) boid.y += screenHeight;
        if (boid.y > screenHeight) boid.y -= screenHeight;
        */
        boid.x = (boid.x + screenWidth) % screenWidth;
        boid.y = (boid.y + screenHeight) % screenHeight;        
    }
}

let last = performance.now();
function draw() {
    const ctx = canvas.getContext("2d");

    const now = performance.now();
    const delta = now - last;
    last = now;

    updateloop(delta);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    /*
    for(const boid of boids) {
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.arc(boid.x, boid.y, 8, 0, Math.PI * 2);
        ctx.fill();
    }
    */

    for (const boid of boids) {
        ctx.save();
        ctx.translate(boid.x, boid.y);

        const angle = Math.atan2(boid.yvel, boid.xvel);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-6, 5);
        ctx.lineTo(-6, -5);
        ctx.closePath();

        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.restore();
    }
}

function reqanimframe() {
    draw();
    requestAnimationFrame(reqanimframe);
}

reqanimframe();

// update weight values
document.getElementById("cohesionFactor").addEventListener("input", (event) => {
    cohesionweight = event.target.value;
});

document.getElementById("alignmentFactor").addEventListener("input", (event) => {
    alignmentweight = event.target.value;
});

document.getElementById("separationFactor").addEventListener("input", (event) => {
    separationweight = event.target.value;
});
