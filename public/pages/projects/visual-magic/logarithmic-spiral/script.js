/*
FUNCTION renderLogarithmicSpiral(canvas, centerX, centerY, a, b, maxTheta, thetaStep)
    // Initialize the graphics context for the canvas
    context = canvas.getGraphicsContext()

    // Clear the canvas
    context.clearCanvas()

    // Begin a new path for drawing
    context.beginPath()

    // Move to the starting point (theta = 0)
    r = a * exp(b * 0)
    x = centerX + r * cos(0)
    y = centerY + r * sin(0)
    context.moveTo(x, y)

    // Iterate over theta from 0 to maxTheta with small increments (thetaStep)
    FOR theta = thetaStep TO maxTheta STEP thetaStep
        // Calculate radius using the logarithmic spiral equation r = a * e^(b * theta)
        r = a * exp(b * theta)

        // Convert polar coordinates (r, theta) to Cartesian coordinates (x, y)
        x = centerX + r * cos(theta)
        y = centerY + r * sin(theta)

        // Draw a line to the new point
        context.lineTo(x, y)
    END FOR

    // Set drawing properties (e.g., line width, color)
    context.setLineWidth(1)
    context.setStrokeColor("black")

    // Stroke the path to render the spiral
    context.stroke()

    // End the path
    context.endPath()
END FUNCTION
*/

const canvas = document.getElementById("canvasElm");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

// configs
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let scaleFactor = 5;
let growthRate = 0.1;
let maxAngle = 40 * Math.PI;
let step = maxAngle / 5000;

// draw loop
function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    // translate to center
    const x = centerX + scaleFactor * Math.cos(0);
    const y = centerY + scaleFactor * Math.sin(0);
    ctx.moveTo(x, y);

    if(step === 0) return; // prevents infinite loop
    
    for(let i = step; i < maxAngle; i += step) {
        const rad = scaleFactor * Math.exp(growthRate * i);

        const x = centerX + rad * Math.cos(i);
        const y = centerY + rad * Math.sin(i);

        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "#000";
    ctx.stroke();
}

// update values
document.getElementById("stepVal").addEventListener("input", (event) => {
    step = Number.parseFloat(event.target.value);
});

document.getElementById("scalefac").addEventListener("input", (event) => {
    scaleFactor = Number.parseFloat(event.target.value);
});

document.getElementById("growthrate").addEventListener("input", (event) => {
    growthRate = Number.parseFloat(event.target.value);
}); 

document.getElementById("size").addEventListener("input", (event) => {
    maxAngle = Math.PI * Number.parseFloat(event.target.value);
});

function animate() {
    requestAnimationFrame(animate);
    draw();
}

animate();
