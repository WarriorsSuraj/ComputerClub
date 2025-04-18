/*
README:

bubble sort sucks, it just sucks
insertion sort is far superior

In a 2007 interview, former Google CEO Eric Schmidt asked then-presidential candidate Barack Obama about the best way to sort one million integers; Obama paused for a moment and replied: "I think the bubble sort would be the wrong way to go."[11][12]

wikipedia article: https://en.wikipedia.org/wiki/Bubble_sort
*/

/*
procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n - 1 inclusive do
            if A[i - 1] > A[i] then
                swap(A[i - 1], A[i])
                swapped := true
            end if
        end for
        n := n - 1
    until not swapped
end procedure

*/
function bubblesort(array) {
    let len = array.length;

    let swapped = true;
    while (swapped) {
        swapped = false;
        for(let i = 1; i < len; i++) {
            if(array[i - 1] > array[i]) {
                swap(array, i - 1, i);
                swapped = true;
            }
        }

        len--;
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

const aa = [5, 4, 7, 9, 6, 1, 8, 3, 2];
console.log(bubblesort(aa));