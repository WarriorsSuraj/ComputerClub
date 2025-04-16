let last = 1;
let seclast = 0;
let val = 0;

let iter = 0;
const goal = 10;

while (iter < goal) {
    seclast = last;
    last = val;

    val = seclast + last;

    iter++;
}

console.log(val);