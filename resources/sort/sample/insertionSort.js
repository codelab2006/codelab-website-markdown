function insertionSort(array) {
    for (let i = 1; i < array.length; i++) { // 取第一个到第 n - 1 个和前面的元素进行比较
        let current = array[i];
        let preIndex = i - 1;
        while (preIndex >= 0 && array[preIndex] > current) { // 如果比较的元素比当前取的元素大，就向前移动一位
            array[preIndex + 1] = array[preIndex];
            preIndex--;
        }
        array[preIndex + 1] = current;
    }
    return array;
}

console.log(insertionSort([2, 4, 1, 7, 3, 0, 5, 9, 8, 6]));
