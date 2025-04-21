/*
README:

quadratic sieve is an integer factorization algorithm.
the 2nd fastest algorithm known to humanity (after the general number field sieve)
fastest for integers under 100 digits



wikipedia article: https://en.wikipedia.org/wiki/Quadratic_sieve


INCOMPLETE!!!!

*/

/*

a = 4; b = 3

4 = q0 × 3 + r0
q0 = 1; r0 = 1
3 = q1 × 1 + r1
q1 = 3; r1 = 0

*/

// euclidean's algorithm to find the GCD (greatest common divisor)
function GCD(a, b) {
    let r;
    while (b) {
        r = a % b;
        a = b;
        b = r;
    }

    return a;
}

const primes = [2, 3, 5, 7];
function factor(number) {
    const sqrt = Math.round(Math.sqrt(number));

    const nears = [
        sqrt,
        sqrt+1,
        sqrt+2,
        sqrt+3,
        sqrt+4,
        sqrt+5,
        sqrt+6,
        sqrt+7,
        sqrt+8,
        sqrt+9,
    ];
    const keepers = [];

    for(const near of nears) {
        const squared = near ** 2;
        const remainder = squared - number;
        const factors = GCD(squared, number);

        if(primes.includes(factors)) keepers.push(near);
    }

    return keepers;
}

factor(437)