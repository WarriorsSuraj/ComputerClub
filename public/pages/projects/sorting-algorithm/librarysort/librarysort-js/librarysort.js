/*
README:

i have never heard of this algorithm EVER (2025-04-17)


IMPORTANT: this algorithm implementation is incomplete. if you figured it out, please do a PR.

related links:
https://www3.cs.stonybrook.edu/~bender/newpub/BenderFaMo06-librarysort.pdf
https://en.wikipedia.org/wiki/Library_sort
*/

/*
procedure rebalance(A, begin, end) is
    r ← end
    w ← end × 2

    while r ≥ begin do
        A[w] ← A[r]
        A[w-1] ← gap
        r ← r − 1
        w ← w − 2

procedure sort(A) is
    n ← length(A)
    S ← new array of n gaps

    for i ← 1 to floor(log2(n-1)) do
        rebalance(S, 1, 2^(i-1))
        for j ← 2^(i-1) to 2^i do
            ins ← binarysearch(A[j], S, 2^i)
            insert A[j] at S[ins]
*/

// what are gaps????????!?!?!

function rebalance(array, begin, end) {
    let r = end;
    let w = end * 2;

    while (r >= begin) {
        array[w] = array[r];
        array[w - 1] = gap;
        r--;
        w -= 2;
    }
}

function sort(array) {
    const n = array.length;
    const s = []; // again, what are gaps??!!?!

    for(let i = 0; i < Math.floor(Math.log2(n - 1)); i++) {
        rebalance(s, 1, 2^(i-1));

        for(let j = 2^(i-1); i < 2^i; i++) {
            const ins = binarysearch(array[j], s, 2^i);
            s[ins] = array[j];
        }
    }
}

// see binarysearch/binarysearch-js/binarysearch.js
function binarysearch(array, T) {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        // alternative algorithm to find the middle: Math.ceil((right - left) / 2)
        const middle = left + Math.floor((right - left) / 2); // can use ~~ instead of floor

        if(array[middle] < T) {
            left = middle + 1;
        } else if (array[middle] > T) {
            right = middle - 1;
        } else return middle
    }

    return null;
}