/*
README:

there are a lot of variants of merge sort, the one i included is "Top-down implementation using lists"

wikipedia article: https://en.wikipedia.org/wiki/Merge_sort#Bottom-up_implementation
*/

/*
function merge_sort(list m) is
    // Base case. A list of zero or one elements is sorted, by definition.
    if length of m ≤ 1 then
        return m

    // Recursive case. First, divide the list into equal-sized sublists
    // consisting of the first half and second half of the list.
    // This assumes lists start at index 0.
    var left := empty list
    var right := empty list
    for each x with index i in m do
        if i < (length of m)/2 then
            add x to left
        else
            add x to right

    // Recursively sort both sublists.
    left := merge_sort(left)
    right := merge_sort(right)

    // Then merge the now-sorted sublists.
    return merge(left, right)

function merge(left, right) is
    var result := empty list

    while left is not empty and right is not empty do
        if first(left) ≤ first(right) then
            append first(left) to result
            left := rest(left)
        else
            append first(right) to result
            right := rest(right)

    // Either left or right may have elements left; consume them.
    // (Only one of the following loops will actually be entered.)
    while left is not empty do
        append first(left) to result
        left := rest(left)
    while right is not empty do
        append first(right) to result
        right := rest(right)
    return result
*/

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

function mergesort(array) {
    if(array.length <= 1) return array;

    let left = [];
    let right = [];

    for(let i = 0; i < array.length; i++) {
        const x = array[i];

        if(i < (array.length/2)) {
            left.push(x);
        } else right.push(x)
    }

    left = mergesort(left);
    right = mergesort(right);

    return merge(left, right);
}

const aa = [4, 7, 6, 1, 2, 5, 9, 3, 8];
console.log(mergesort(aa));