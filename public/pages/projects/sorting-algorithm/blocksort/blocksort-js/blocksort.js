/*
README: WARNING! READ THE TEXT BELOW BEFORE CONTINUING IF YOU DO NOT KNOW WHAT YOU ARE DOING!!!

blocksort is a stupidly overcomplicated sorting algorithm which leverages these operations for it's algorithm:
- swapping
- block swap (exchanges parts of an array with some other parts)
- binary search
- linear search
- insertion sort
- array rotation
- floor power of two

for this reason, NEVER utilise this ANYWHERE. this is just to showcase it's (stupid) beauty.

side note: i hate myself after making this
*/

/*
   BlockSort(array)
       power_of_two = FloorPowerOfTwo(array.size)
       scale = array.size/power_of_two // 1.0 ≤ scale < 2.0
      
       // insertion sort 16–31 items at a time
       for (merge = 0; merge < power_of_two; merge += 16)
           start = merge * scale
           end = start + 16 * scale
           InsertionSort(array, [start, end))
      
       for (length = 16; length < power_of_two; length += length)
           for (merge = 0; merge < power_of_two; merge += length * 2)
               start = merge * scale
               mid = (merge + length) * scale
               end = (merge + length * 2) * scale
              
               if (array[end − 1] < array[start])
                   // the two ranges are in reverse order, so a rotation is enough to merge them
                   Rotate(array, mid − start, [start, end))
               else if (array[mid − 1] > array[mid])
                   Merge(array, A = [start, mid), B = [mid, end))
               // else the ranges are already correctly ordered
*/

function blocksort(array) {
    const poweroftwo = FloorPowerOfTwo(array.length);
    const scale = array.length / poweroftwo;

    for(let merge = 0; merge < poweroftwo; merge += 16) {
        const start = Math.floor(merge * scale);
        const end = Math.floor(start + 16 * scale);

        array = improvedinsertionsort(array.slice(start, end)).concat(array.slice(end));
    }

    for(let length = 16; length < poweroftwo; length += length) {
        for(let merge = 0; merge < poweroftwo; merge += length * 2) {
            const start = Math.floor(merge * scale);
            const mid = Math.floor((merge + length) * scale);
            const end = Math.floor((merge + length * 2) * scale);

            if(array[end - 1] < array[start]) {
                rotate(array, mid - start, [start, end]);
            } else if (array[mid - 1] > array[mid]) {
                const left = array.slice(start, mid);
                const right = array.slice(mid, end);
                const merged = merge(left, right);

                array = array.slice(0, start).concat(merged).concat(array.slice(end));
            }
        }
    }

    return array;
}

function rotate(array, shift, start, end) {
    let shft = shift;
    shft = shift % (end - start);
    if (shift < 0) {
        shft += (end - start);
    }

    reverse(array, start, start + shft - 1);
    reverse(array, start + shft, end - 1);
    reverse(array, start, end - 1);

    return array;
}

function reverse(array, start, end) {
    let strt = start;
    let endd = end;

    while (strt < endd) {
        swap(array, strt, endd);
        strt++;
        endd--;
    }
}

function FloorPowerOfTwo(x) {
    let val = x;

    val = val | (val >> 1);
    val = val | (val >> 2);
    val = val | (val >> 4);
    val = val | (val >> 8);
    val = val | (val >> 16);

    // this line below should only be used on 64bit systems, so remove if otherwise
    val = val | (val >> 32);

    return val - (val >> 1);
}

function improvedinsertionsort(array) {
    let i = 0;

    while (i < array.length) {
        const x = array[i];
        let j = i;

        while (j > 0 && array[j - 1] > x) {
            array[j] = array[j - 1];

            j--;
        }

        array[j] = x;

        i++;
    }

    return array;
}


// optimize this to remove memory alloc using temp
function swap(array, i, j) {
    const temp = array[i];

    array[i] = array[j];
    array[j] = temp;

    /* example optimization

    [array[i], array[j]] = [array[j], array[i]];
    */
}

function merge(left, right) {
    const res = [];

    while (left.length > 0 && right.length > 0) {
        if(left[0] <= right[0]) {
            res.push(left.shift());
        } else {
            res.push(right.shift());
        }
    }

    while (left.length > 0) {
        res.push(left.shift());
    }

    while (right.length > 0) {
        res.push(right.shift());
    }

    return res;
}

const aa = [3, 1, 4, 2, 7, 6, 5, 9, 8];
console.log(blocksort(aa));