/*
README:

this is a collection of multiple variations of insertion sort (ranked slowest -> fastest in descending order).
all the used pseudocode will also be provided.

wikipedia article: 

*/


// recursion based (do not ever use, recursion sucks)
/*
function insertionSortR(array A, int n)
    if n > 0
        insertionSortR(A, n-1)
        x ← A[n]
        j ← n-1
        while j >= 0 and A[j] > x
            A[j+1] ← A[j]
            j ← j-1
        end while
        A[j+1] ← x
    end if
end function
*/

function insertionsortR(array, n) {
    if(n > 0) {
        insertionsortR(array, n - 1);

        const x = array[n];
        let j = n - 1;

        while (j >= 0 && array[j] > x) {
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = x;
    }

    // annoyingly returns undefined at array[length(array) - 1], quick fix added using slice
    return array.slice(0, array.length - 1);
}


// mediocre version, can be improved (see version after)
/*
i ← 1
while i < length(A)
    j ← i
    while j > 0 and A[j-1] > A[j]
        swap A[j] and A[j-1]
        j ← j - 1
    end while
    i ← i + 1
end while
*/

function insertionsort(array) {
    let i = 0;

    while (i < array.length) {
        let j = i;

        while (j > 0 && array[j - 1] > array[j]) {
            swap(array, j, j - 1);

            j--;
        }

        i++;
    }

    return array;
}


// optimized insertionsort based on the above version
/*
i ← 1
while i < length(A)
    x ← A[i]
    j ← i
    while j > 0 and A[j-1] > x
        A[j] ← A[j-1]
        j ← j - 1
    end while
    A[j] ← x[3]
    i ← i + 1
end while
*/

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

/* example to test it out, replace function with whatever version you want to use
const aa = [5, 3, 1, 2, 7, 8, 9];
console.log(improvedinsertionsort(aa, aa.length));
*/
