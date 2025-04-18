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

fn insertionsort(arr: &mut Vec<u32>) -> &mut Vec<u32> {
    let mut i = 0;

    while i < arr.len() {
        let mut j = i;

        while j > 0 && arr[j - 1] > arr[j] {
            swap(&mut arr[..], j, j - 1);
            j -= 1;
        }

        i += 1;
    }
    
    arr
}

fn swap(arr: &mut [u32], a: usize, b: usize) {
    let temp = arr[b];

    arr[b] = arr[a];
    arr[a] = temp;
}

fn main() {
    let mut a = Vec::new();
    a.push(2);
    a.push(8);
    a.push(5);
    a.push(6);
    a.push(4);
    a.push(3);
    a.push(1);

    let b = insertionsort(&mut a);
    println!("{:?}", b);
}