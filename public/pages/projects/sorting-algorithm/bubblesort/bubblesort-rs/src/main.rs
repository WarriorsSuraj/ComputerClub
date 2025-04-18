fn bubblesort(array: &mut Vec<u32>) {
    let mut len = array.len();
    let mut swapped = true;

    while swapped {
        swapped = false;

        for i in 1..len {
            if array[i - 1] > array[i] {
                swap(array, i - 1, i);
                swapped = true;
            }
        }

        len -= 1;
    }
}

fn swap(arrayy: &mut Vec<u32>, a: usize, b: usize) {
    let temp = arrayy[b];

    arrayy[b] = arrayy[a];
    arrayy[a] = temp;
}

fn main() {
    let mut numbers = vec![3, 4, 7, 6, 1, 2, 5, 8, 9];
    bubblesort(&mut numbers);

    println!("{:?}", numbers);
}
