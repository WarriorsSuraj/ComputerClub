// i have never seen anything more unsettling than this heaping pile of shi*t
// and i have no clue how this even works (based entirely off the pseudocode)

/*
# Sort an array a[0...n-1].
gaps = [701, 301, 132, 57, 23, 10, 4, 1]  # Ciura gap sequence

# Start with the largest gap and work down to a gap of 1
# similar to insertion sort but instead of 1, gap is being used in each step
foreach (gap in gaps)
{
    # Do a gapped insertion sort for every element in gaps
    # Each loop leaves a[0..gap-1] in gapped order
    for (i = gap; i < n; i += 1)
    {
        # save a[i] in temp and make a hole at position i
        temp = a[i]
        # shift earlier gap-sorted elements up until the correct location for a[i] is found
        for (j = i; (j >= gap) && (a[j - gap] > temp); j -= gap)
        {
            a[j] = a[j - gap]
        }
        # put temp (the original a[i]) in its correct location
        a[j] = temp
    }
}
*/

function shellsort(array) {
    const gaps = [701, 301, 132, 57, 23, 10, 4, 1];

    for(const gap of gaps) {
        // now we DO AN INSERTION SORT??!?!?

        for(let i = gap; i < array.length; i++) {
            const temp = array[i];

            let j;
            for(j = i; (j >= gap) && (array[j - gap] > temp); j -= gap) {
                array[j] = array[j - gap];
            }

            array[j] = temp;
        }
    }

    return array;
}

const aa = [5, 2, 1, 4, 7, 3, 8, 6, 9];
console.log(shellsort(aa));