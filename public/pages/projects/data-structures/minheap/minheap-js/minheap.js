/*
README:

insert: O(log n)
extractMin: O(log n)
getMin: O(1)
heapify: O(log n)
build heap: O(n)

*/

class MinHeap {
    constructor(comparator, capacity) {
        this.array = [];
        this.size = this.array.length;

        // optional:
        this.capacity = capacity;
        this.comparator = comparator || ((a, b) => a - b);
    }

    parent(index) {
        return ~~((index - 1) / 2);
    }

    leftChild(index) {
        return 2 * index + 1;
    }

    rightChild(index) {
        return 2 * index + 2;
    }

    swap(a, b) {
        [this.array[a], this.array[b]] = [this.array[b], this.array[a]];
    }

    // restructure heap so smallest at top
    heapify(index) {
        let smallest = index;
        const left = this.leftChild(smallest);
        const right = this.rightChild(smallest);

        if(left < this.size && this.comparator(this.array[left], this.array[smallest]) < 0) {
            smallest = left;
        }

        if(right < this.size && this.comparator(this.array[right], this.array[smallest]) < 0) {
            smallest = right;
        }

        if(smallest !== index) {
            this.swap(index, smallest);
            this.heapify(smallest);
        }
    }

    insert(value) {
        if(this.size >= (this.capacity || Number.POSITIVE_INFINITY)) {
            throw new Error("HEAP IS FULL");
        }

        this.array[this.size] = value;
        this.size = this.array.length;

        let current = this.size - 1;
        const parent = this.parent(current);
        while(current > 0 && this.comparator(this.array[current], this.array[parent]) < 0) {
            this.swap(current, parent);
            current = parent;
        }
    }

    get Min() {
        return this.array[0];
    }

    fixHeap() {
        if(!this.array.length) return;

        this.array[0] = this.array[this.size - 1];
        this.size = this.array.length;

        //this.array.pop();
        this.heapify(0);

        return true;
    }

    removeMin() {
        const min = this.array[0];
        this.fixHeap();
        return min;
    }
    
    // builds a heap from an array
    buildHeap(array, size, hasCapacity) {
        this.array = array;
        this.size = size;
        if(hasCapacity) this.capacity = this.size;

        for(let i = ~~((this.size / 2) - 1); i >= 0; i--) {
            this.heapify(i);
        }
    }

    has(item) {
        return this.array.includes(item);
    }
}