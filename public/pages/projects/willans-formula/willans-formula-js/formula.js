/*
README:

formula to calculate for the n'th prime number
probably will start to break down because of floating point schenanigans

also, its SUPER inefficient if your goal is to get prime numbers

really nice video to help visualise:
https://www.youtube.com/watch?v=j5s0h42GfvM

*/

// extrapolate the math methods in js window.math (to make everything look a bit cleaner)
const {
    floor,
    cos,
    PI,
    pow
} = Math;

// we can also cache values to speed up
const factorialcache = {};
function factorial(n) {
    if(factorialcache[n]) return factorialcache[n];

    let res = 1;
    for(let i = n; i > 1; i--) {
        res *= i;
    }

    factorialcache[n] = res;

    return res;
}

function add(vals) {
    let res = 0;

    for(const val of vals) {
        res += val;
    }

    return res;
}

function calcprime(n) {
    const results = [];
    for(let i = 1; i < 2 ** n + 1; i++) {

        const vals = [];
        for(let j = 1; j < i + 1; j++) {
            const temp = floor(cos(PI * (factorial(j - 1) + 1) / j) ** 2);
            vals.push(temp);
        }

        const res = add(vals);

        const outside = floor(pow(n / res, 1 / n)); //Math.floor(Math.pow(n / res), 1 / n);
        results.push(outside);
    }

    const final = add(results);
    return 1 + final;
}

console.log(calcprime(7));