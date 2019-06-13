function bubbleSort(array) {
    for (let i = 0; i < array.length - 1; i++) { // 需要对 n - 1 个元素各进行一轮比较
        for (let j = 0; j < array.length - 1 - i; j++) { // 每个元素和 array.length - 1 - i 各元素进行比较
            if (array[j] > array[j + 1]) {
                let temp = array[j + 1];
                array[j + 1] = array[j];
                array[j] = temp;
            }
        }
    }
    return array;
}

console.log(bubbleSort([2, 4, 1, 7, 3, 0, 5, 9, 8, 6]));
