fn quicksort(arrayy: &mut Vec<u32>, lowindx: usize, highindx: usize) -> () {
    if lowindx >= highindx {
        return;
    }

    let pivotindx = partition(arrayy, lowindx, highindx);

    quicksort(arrayy, lowindx, pivotindx - 1);
    quicksort(arrayy, pivotindx + 1, highindx);
}

fn partition(arrayy: &mut Vec<u32>, lowindx: usize, highindx: usize) -> usize {
    let pivot = arrayy[highindx];
    let mut temp = lowindx;

    for ref mut i in lowindx..highindx {
        if arrayy[*i] <= pivot {
            swap(arrayy, temp, *i);

            temp += 1;
        }

        *i += 1;
    }

    swap(arrayy, temp, highindx);

    temp
}

fn swap(arrayy: &mut Vec<u32>, a: usize, b: usize) {
    let temp = arrayy[b];

    arrayy[b] = arrayy[a];
    arrayy[a] = temp;
}

fn main() {
    let mut numbers: Vec<u32> = vec![4, 3, 1, 2, 7, 6, 9, 8, 5];
    let size = numbers.len();
    quicksort(&mut numbers, 0, size - 1);

    println!("{:?}", numbers);
}
