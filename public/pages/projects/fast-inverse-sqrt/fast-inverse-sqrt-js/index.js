/*
README:

returns the inverse sqrt of a number (can also return the sqrt).
the magic that powered quake 3's insane graphics (for its time).
absolutely USELESS in todays world.

*/

/* ORIGINAL code from quake 3

float Q_rsqrt( float number )
{
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
}
*/

function fastinvsqrt(n) {
    const threehalfs = 1.5;

    const x2 = n * 0.5;
	let y = n;

    // javascript is weird
    
	const i = new Float32Array(1);
	i[0] = y;

    let i2 = new Int32Array(i.buffer)[0];
    i2 = 0x5f3759df - (i2>>1);

    new Int32Array(i.buffer)[0] = i2;
    y = i[0];

    y = y * (threehalfs - (x2 * y * y)); // newton iteration, repeat to increase accuracy


    return y; // return n * y;
}

console.log(fastinvsqrt(49));