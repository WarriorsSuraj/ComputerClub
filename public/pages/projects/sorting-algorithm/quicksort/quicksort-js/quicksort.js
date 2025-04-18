/*
pseudocode for quicksort, taken from wikipedia: 

// Sorts (a portion of) an array, divides it into partitions, then sorts those
algorithm quicksort(A, lo, hi) is 
  // Ensure indices are in correct order
  if lo >= hi || lo < 0 then 
    return
    
  // Partition array and get the pivot index
  p := partition(A, lo, hi) 
      
  // Sort the two partitions
  quicksort(A, lo, p - 1) // Left side of pivot
  quicksort(A, p + 1, hi) // Right side of pivot

// Divides array into two partitions
algorithm partition(A, lo, hi) is 
  pivot := A[hi] // Choose the last element as the pivot

  // Temporary pivot index
  i := lo

  for j := lo to hi - 1 do 
    // If the current element is less than or equal to the pivot
    if A[j] <= pivot then 
      // Swap the current element with the element at the temporary pivot index
      swap A[i] with A[j]
      // Move the temporary pivot index forward
      i := i + 1

  // Swap the pivot with the last element
  swap A[i] with A[hi]
  return i // the pivot index
*/

/*
recursive implementation of quicksort

note: this is a very inefficient quicksort implementation (runs in quadratic time).
to see a more optimized example: https://en.wikipedia.org/wiki/Quicksort#Repeated_elements
*/

function quicksort(array, lowindx, highindx) {
    if(lowindx >= highindx || lowindx < 0) return array;

    const pivotindx = partition(array, lowindx, highindx);

    quicksort(array, lowindx, pivotindx - 1);
    quicksort(array, pivotindx + 1, highindx);

    return array;
}

function partition(array, lowindx, highindx) {
    const pivot = array[highindx];

    let temp = lowindx;

    for(let i = lowindx; i <= highindx - 1; i++) {
        if(array[i] <= pivot) {
            const verytemp = array[temp];

            swap(array, temp, i);

            temp++
        }
    }

    swap(array, temp, highindx);
    return temp;
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

// example sorting
const arry = [7, 5, 6, 2, 3, 1, 4, 9, 8];
const arr = quicksort(arry, 0, arry.length - 1);

console.log(arr);