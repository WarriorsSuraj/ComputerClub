use std::time::Instant;

/* recursive fibonacci sequence

time complexity: O(n^2) - very bad
*/

fn fib(mut n: u128) -> u128 {
    n -= 1;

    match n {
        0 => 1,
        1 => 1,
        _ => fib(n - 1) + fib(n - 2),
    }
}

/* most logical fibonacci calculation system

while loop

time complexity: i don't know (might be O(log(n)))
*/

fn fastfib(mut n: u128) -> u128 {
    n -= 1;

    let mut last: u128 = 1;
    let mut seclast: u128 = 0;
    let mut val: u128 = 0;

    let mut iter = 0;
    while iter < n {
        val = seclast + last;

        seclast = last;
        last = val;

        iter += 1;
    }

    val
}

fn main() {
    let iter = 186;

    let start = Instant::now();
    println!("result: {}", fastfib(iter));

    let elapsed = start.elapsed();

    println!(
        "time taken to calculate the {}th fibonacci number: {:?}",
        iter, elapsed
    );
}
