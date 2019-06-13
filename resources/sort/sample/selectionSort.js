function selectionSort(array) {
    for (let i = 0; i < array.length - 1; i++) { // 在 0 ... array.length - 1 位置上分别插入最小值
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) { // 每次从 i + 1 的位置开始寻找
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }
    return array;
}

console.log(selectionSort([2, 4, 1, 7, 3, 0, 5, 9, 8, 6]));
