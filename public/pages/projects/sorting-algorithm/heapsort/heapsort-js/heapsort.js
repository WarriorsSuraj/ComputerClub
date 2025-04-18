/* README:

this sorting algorithm is a little more complex than the rest (besides block sort, what the f*ck is that).
despite that, it's *pretty* good overall.

IMPORTANT: this heapsort implementation returns the array in order of [greatest -> smallest] (way too lazy to fix, make a PR if you figured it out)
*/

// maxheap implementation (i made this a really long time ago)
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    get _length() {
        return this.heap.length;
    }

    getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }

    getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }

    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2); // can also use ~~ for flooring
    }

    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }

    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.heap.length;
    }

    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }

    leftChild(index) {
        return this.heap[this.getLeftChildIndex(index)];
    }

    rightChild(index) {
        return this.heap[this.getRightChildIndex(index)];
    }

    parent(index) {
        return this.heap[this.getParentIndex(index)];
    }

    swap(indexOne, indexTwo) {
        const temp = this.heap[indexOne];

        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
    }

    peek() {
        if (this.heap.length === 0) {
            return null;
        }

        return this.heap[0];
    }

    // removing an element will remove the
    // top element with highest priority then
    // heapifyDown will be called
    remove() {
        if (this.heap.length === 0) {
            return null;
        }

        const item = this.heap[0];

        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();

        return item;
    }

    add(item) {
        this.heap.push(item);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;

        while (this.hasParent(index) && this.parent(index) < this.heap[index]) {
            this.swap(this.getParentIndex(index), index);

            index = this.getParentIndex(index);
        }
    }

    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let largerChildIndex = this.getLeftChildIndex(index);

            if (this.hasRightChild(index) && this.rightChild(index) > this.leftChild(index)) {
                largerChildIndex = this.getRightChildIndex(index);
            }

            if (this.heap[index] > this.heap[largerChildIndex]) {
                break;
            }

            this.swap(index, largerChildIndex);

            index = largerChildIndex;
        }
    }

    // for testing
    printHeap() {
        let heap = ` ${this.heap[0]} `;

        for (let i = 1; i < this.heap.length; i++) {
            heap += ` ${this.heap[i]} `;
        }

        console.log(heap);
    }
}

function heapsort(array) {
    const maxheap = new MaxHeap;
    for(const elm of array) maxheap.add(elm);

    const sorted = [];
    for(let i = 0; i < array.length; i++) {
        sorted.push(maxheap.remove());
    }

    return sorted;
}

const aa = [5, 7, 4, 1, 2, 9, 3, 6, 8];
console.log(heapsort(aa))