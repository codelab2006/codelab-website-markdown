# Java 集合类
> author: Yongjian Huang
> tags: Java

文章摘要
**********
## Iterable
实现了 Iterable 接口的对象，可以使用 for-each 语句进行迭代。
```
package top.codelab.main;

import java.util.Iterator;

public class Main {

    public static void main(String[] args) {
        for (Integer i : new Iterable<Integer>() {
            @Override
            public Iterator<Integer> iterator() {
                return new Iterator<Integer>() {
                    private int i = 0;
                    @Override
                    public boolean hasNext() { return true; }
                    @Override
                    public Integer next() { return this.i++; }
                };
            }
        }) {
            if (i == 100) break;
            System.out.println(i);
        }
    }
}
```

## Iterator
Iterator 替代了 Enumeration 接口，Iterator 允许在迭代的过程中删除元素。
```
package top.codelab.main;

import java.util.Arrays;
import java.util.Iterator;

class IteratorImpl implements Iterable<String> {

    private String[] elements = {"Java", "JavaScript", "C#", "C++", "C"};

    class Iter implements Iterator<String> {

        private int index = 0;

        @Override
        public boolean hasNext() {
            return this.index < IteratorImpl.this.elements.length;
        }

        @Override
        public String next() {
            return IteratorImpl.this.elements[this.index++];
        }

        @Override
        public void remove() {
            IteratorImpl.this.elements = Arrays.stream(IteratorImpl.this.elements).filter(e -> !e.equals(IteratorImpl.this.elements[this.index - 1])).toArray(String[]::new);
        }
    }

    @Override
    public Iterator<String> iterator() {
        return new Iter();
    }
}

public class Main {

    public static void main(String[] args) {
        IteratorImpl iteratorImpl = new IteratorImpl();
        Iterator<String> iterator = iteratorImpl.iterator();
        while (iterator.hasNext()) {
            String next = iterator.next();
            if (next.equals("C++")) {
                iterator.remove();
            }
        }
        iterator = iteratorImpl.iterator();
        while (iterator.hasNext()) System.out.println(iterator.next());

        Iterator<String> iterator1 = iteratorImpl.iterator();
        Iterator<String> iterator2 = iteratorImpl.iterator();

        while (iterator1.hasNext()) {
            String next = iterator1.next();
            System.out.println("iterator1 " + next);
            if (next.equals("C#")) {
                break;
            }
        }
        while (iterator2.hasNext()) {
            String next = iterator2.next();
            System.out.println("iterator2 " + next);
        }
    }
}
```

## Collection
Collection 定义了许多针对集合的操作，许多常用的接口都继承于它，例如：Set，List，Queue。

## Collections
Collections 是一个工具类，它包含了大量和集合相关的通用方法。使用 Collections 类能帮你节约许多的开发时间。

## Set
Set 代表了一个元素不重复的集合。常用的实现类：HashSet，LinkedHashSet。
```
package top.codelab.main;

import java.util.HashSet;
import java.util.Set;

public class Main {

    public static void main(String[] args) {
        Set<Integer> intSet = new HashSet<>();
        intSet.add(1);
        intSet.add(2);
        intSet.forEach(System.out::println);

        Set<Object> set = new HashSet<>();
        set.add(1);
        set.add("2");
        set.forEach(System.out::println);
    }
}
```

## HashSet
HashSet 依靠哈希表来存储数据，它的内部实现其实是使用了一个 HashMap 的实例，它不保证其元素的迭代顺序。它不是线程安全的，你可以使用 Collections.synchronizedSet 方法去包装它，使其变为线程安全的。使用时避免一个线程迭代它的时候，另一个线程正好修改它，虽然这时 ConcurrentModificationException 异常会被抛出，但是此异常仅用于检测错误。

## LinkedHashSet
LinkedHashSet 类似于 HashSet，它的内部实现其实是使用了一个 LinkedHashMap 实例，保证了其元素的迭代顺序，迭代顺序就是元素的插入顺序。它也不是线程安全的，你可以使用 Collections.synchronizedSet 方法去包装它。

## SortedSet
SortedSet 代表了一个支持排序的，元素不重复的集合。常用的实现类：TreeSet。
```
package top.codelab.main;

import java.util.SortedSet;
import java.util.TreeSet;

public class Main {

    public static void main(String[] args) {

        SortedSet<Integer> sortedSet = new TreeSet<>();
        sortedSet.add(2);
        sortedSet.add(1);
        sortedSet.forEach(System.out::println);

        sortedSet = new TreeSet<>((o1, o2) -> o2 - o1);
        sortedSet.add(2);
        sortedSet.add(1);
        sortedSet.forEach(System.out::println);
    }
}
```

## NavigableSet
NavigableSet 继承于 SortedSet，它定义了额外的集合相关的功能，例如：ceiling, floor, higher, lower 等。常用的实现类：TreeSet。
```
package top.codelab.main;

import java.util.NavigableSet;
import java.util.TreeSet;

public class Main {

    public static void main(String[] args) {

        NavigableSet<Integer> navigableSet = new TreeSet();
        navigableSet.add(10);
        navigableSet.add(25);
        navigableSet.add(15);
        navigableSet.add(30);
        navigableSet.add(20);

        System.out.println(navigableSet.ceiling(15));
        System.out.println(navigableSet.floor(15));
        System.out.println(navigableSet.higher(15));
        System.out.println(navigableSet.lower(15));
    }
}
```

## TreeSet
TreeSet 实现了 NavigableSet 接口，它的内部实现其实是使用了一个 TreeMap 实例。它也不是线程安全的，你可以使用 Collections.synchronizedSortedSet 方法去包装它。

## List
List 代表了一个元素可以重复的有序集合，用户可以更具索引插入，获取，删除元素，可以对元素进行排序。List 还提供了一个特殊的迭代器 ListIterator，它允许元素插入和替换，以及 Iterator 接口提供的常规操作之外的双向访问。提供了一种方法来获得从列表中的指定位置开始的列表迭代器。

## ArrayList
ArrayList 一个可伸缩的序列，实现了 List 接口，其容量大小可以变化，可以存储 null 值，还提供了一些维护内部数组的方法。它不是线程安全的，你可以使用 Collections.synchronizedList 方法去包装它，使其变为线程安全的。使用时避免一个线程迭代它的时候，另一个线程正好修改它，虽然这时 ConcurrentModificationException 异常会被抛出，但是此异常仅用于检测错误。如果需要在一个 ArrayList 中插入大量的数据，考虑先使用 ensureCapacity 增加容量，可以有效提升插入效率。

## LinkedList
LinkedList 一个双向的链表，实现了 List 接口和 Deque 接口。可以存储 null 值。和 ArrayList 一样，不是线程安全的，你可以使用 Collections.synchronizedList 方法去包装它。

## Vector
Vector 类似 ArrayList，它是线程安全的，但是并不推荐使用。推荐使用 ArrayList。

## Stack
Stack 一个后进先出的栈，继承于 Vector 类，但是并不推荐使用，应优先使用 ArrayDeque。

## Queue
Queue 代表了一个元素的集合，继承于 Collection 接口，除了基本的 Collection 操作外，还提供额外的插入，提取和检查操作。这些方法中的每一种都以两种形式存在：一种在操作失败时抛出异常，另一种返回特殊值（ null 或 false，具体取决于操作）。Queue 并不支持插入 null 值，即使有的实现，例如：LinkedList 允许它，但也不应该插入 null 值，因为 poll 方法会返回 null 表示队列中不存在某元素。
