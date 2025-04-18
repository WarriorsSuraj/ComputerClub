fn shellsort(array: &mut Vec<u32>) {
    let gaps = [701, 301, 132, 57, 23, 10, 4, 1];

    for gap in gaps {
        for i in gap..array.len() {
            let temp = array[i];

            let mut j = i;
            while j >= gap && array[j - gap] > temp {
                array[j] = array[j - gap];
                j -= gap;
            }

            array[j] = temp;

            //i += 1;
        }
    }
}

fn main() {
    let mut numbers: Vec<u32> = vec![4, 3, 1, 2, 7, 6, 9, 8, 5];
    shellsort(&mut numbers);

    println!("{:?}", numbers);
}
