/*
README:

basic implementation of a binary search.

wikipedia article: https://en.wikipedia.org/wiki/Binary_search#Algorithm

*/

/*
function binary_search(A, n, T) is
    L := 0
    R := n − 1
    while L ≤ R do
        m := L + floor((R - L) / 2)
        if A[m] < T then
            L := m + 1
        else if A[m] > T then
            R := m − 1
        else:
            return m
    return unsuccessful
*/

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