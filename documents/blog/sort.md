# 排序算法
> author: Yongjian Huang
> tags: 算法

文章摘要
**********
## 冒泡排序：稳定，时间复杂度：O(n2)
```
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
```
## 选择排序：不稳定，时间复杂度：O(n2)
```
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
```
## 插入排序：稳定，时间复杂度：O(n2)
```
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
```
