


fn swap(arrayy: &mut Vec<u32>, a: usize, b: usize) {
    let temp = arrayy[b];

    arrayy[b] = arrayy[a];
    arrayy[a] = temp;
}

fn selectionsort(array: &mut Vec<u32>) {

}

/*
function selectionsort(array) {
    const len = array.length;

    // we can do len - 1 because the last elm will always be correct (logically speaking)
    for(let i = 0; i < len - 1; i++) {
        // assume the next element is the minimum
        let min = i;

        // test against the remaining elements to see if there is anything smaller
        for(let j = i + 1; j < len; j++) {
            if(array[j] < array[min]) min = j;
        }

        // check if we need to perform a swap operation
        if(min !== i) {
            swap(array, i, min);
        }
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

const aa = [4, 5, 7, 2, 1, 8, 9, 3];
console.log(selectionsort(aa));
*/