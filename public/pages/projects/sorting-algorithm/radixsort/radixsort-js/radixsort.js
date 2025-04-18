/*
README:

this is a stupidly good sorting algorithm for small integers (and some very specific string types).
NOTE: this is the only algorithm i did not make myself, instead me and my friend prototyped it, and then fixed some bugs using chatgpt.

this algorithm outperforms native JS v8 timsort by about 3-5x on average

name: radix sort
wikipedia article: https://en.wikipedia.org/wiki/Radix_sort
*/

function getDigit(number, place) {
    return Math.floor(Math.abs(number) / 10 ** place) % 10;
}

function digitCount(number) {
    if(num === 0) return 0;
    return Math.floor(Math.log10(Math.abs(number))) + 1;
}

function mostDigits(nums) {
    let maxDigits = 0;
    for (const num of nums) {
        maxDigits = Math.max(maxDigits, digitCount(num));
    }
    return maxDigits;
}

function radixSort(nums) {
    let numbers = nums;
    const maxDigitCount = mostDigits(numbers);

    for (let k = 0; k < maxDigitCount; k++) {
        const digitBuckets = Array.from({ length: 10 }, () => []);
        
        for (let i = 0; i < numbers.length; i++) {
            const digit = getDigit(numbers[i], k);
            digitBuckets[digit].push(numbers[i]);
        }

        numbers = [].concat(...digitBuckets);
    }

    return numbers;
}