/*
	long i;
	float x2, y;
	const float threehalfs = 1.5F;

	x2 = number * 0.5F;
	y  = number;
	i  = * ( long * ) &y;                       // evil floating point bit level hacking
	i  = 0x5f3759df - ( i >> 1 );               // what the fuck?
	y  = * ( float * ) &i;
	y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
//	y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed

	return y;
 */

fn fast_inv_sqrt(n: f64) -> f64 {
    let mut i: u64;
    let mut x2: f64;
    let mut y: f64;
    let threehalfs: f64 = 1.5;

    x2 = n * 0.5;
    y = n;

    i = y;
    i = 0x5f3759df - ( i >> 1 );

    y = i;
    y = y * ( threehalfs - ( x2 * y * y ) );

    return y;
}

fn main() {
    println!("{}", fast_inv_sqrt(7.0));
}