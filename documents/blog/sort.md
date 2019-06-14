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
## 归并排序：稳定，时间复杂度：O(N*logN)
```
function mergeSort(array) { // 拆分数组 1 -> 2, 2 -> 4, 4 -> 8
  let len = array.length;
  if (len < 2) {
    return array;
  }
  let middle = Math.floor(len / 2),
      left = array.slice(0, middle),
      right = array.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) { // 合并数组，合并时进行排序
  let result = [];

  while(left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while(left.length) result.push(left.shift());
  while(right.length) result.push(right.shift());

  return result;
}
```
## 快速排序：不稳定，时间复杂度：O(N*logN)
```
function quickSort(array, left = 0, right = array.length - 1) {
  if (left >= right) { return }
  let i = left; // i 从数组左边开始
  let j = right; // j 从数组右边开始
  let pivot = array[j]; // 取一个轴元素
  while (i < j) {
    while (i < j && array[i] <= pivot) { // 当前的元素小于或等于轴元素，继续找下一个元素
      i++;
    }
    array[j] = array[i]; // 发现当前的元素大于轴元素或者已经遍历完
    while (i < j && array[j] >= pivot) {
      j--;
    }
    array[i] = array[j];
  }
  array[j] = pivot;
  quickSort(array, left, j - 1);
  quickSort(array, j + 1, right);
}
```
