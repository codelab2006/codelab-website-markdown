# Java 集合类
> author: Yongjian Huang
> tags: Java

文章摘要
**********
## Iterable
类型：interface
描述：实现了 Iterable 的对象，可以使用 for-each 语句进行迭代。
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
                    public boolean hasNext() {
                        return true;
                    }

                    @Override
                    public Integer next() {
                        return this.i++;
                    }
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
类型：interface
描述：Iterator 替代了 Enumeration ，Iterator 允许在迭代的过程中删除元素。
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
类型：interface
描述：Collection 定义了一组针对集合的操作，许多常用的接口都从它继承，例如：Set，List，Queue。

## Collections
类型：class
描述：Collections 是一个工具类，它包含了大量和集合相关的通用方法。

## Set
类型：interface
描述：Set 代表了一个元素不重复的集合，常用的实现类：HashSet，LinkedHashSet。
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
类型：class
实现接口：Set
保证迭代顺序：否
线程安全：否，如果你需要在多线程环境下使用它，请使用 Collections.synchronizedSet 方法。
描述：它的内部实现其实是使用了一个 HashMap 的实例。
如果在创建 iterator 之后，使用了除 iterator.remove 方法之外的方法修改了集合，iterator 将抛出一个 ConcurrentModificationException 异常。请注意 iterator 也只能尽可能的抛出 ConcurrentModificationException 异常，编写依赖于此异常的程序以确保其正确性是错误的。

## LinkedHashSet
类型：class
父类：HashSet
保证迭代顺序：是，迭代顺序就是元素的插入顺序。
线程安全：否，如果你需要在多线程环境下使用它，请使用 Collections.synchronizedSet 方法。
描述：它的内部实现其实是使用了一个 LinkedHashMap 实例。

## SortedSet
类型：interface
描述：SortedSet 代表了一个支持排序的，元素不重复的集合，常用的实现类：TreeSet。
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
类型：interface
父类：SortedSet
描述：它定义了额外的集合相关的功能，例如：ceiling, floor, higher, lower 等。
常用的实现类：TreeSet。
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
类型：class
实现接口：NavigableSet
TreeSet 实现了 NavigableSet 接口，它的内部实现其实是使用了一个 TreeMap 实例。
TreeSet 是非线程安全的，如果你需要在多线程环境下使用它，请使用 Collections.synchronizedSortedSet 方法。

## List interface
List 代表了一个元素可以重复的有序集合，用户可以根据索引插入，获取，删除元素，可以对元素进行排序。
List 还提供了一个特殊的迭代器 ListIterator，它允许元素插入和替换，以及 Iterator 接口提供的常规操作之外的双向访问。
提供了一种方法来获得从列表中的指定位置开始的列表迭代器。

## ArrayList class
ArrayList 一个可伸缩的序列，实现了 List 接口，其容量大小可以变化，可以存储 null 值，还提供了一些维护内部数组的方法。
ArrayList 是非线程安全的，如果你需要在多线程环境下使用它，请使用 Collections.synchronizedList 方法。
如果在创建 iterator 之后，使用了除 iterator.remove 方法之外的方法修改了集合，iterator 将抛出一个 ConcurrentModificationException 异常。请注意 iterator 也只能尽可能的抛出 ConcurrentModificationException 异常，编写依赖于此异常的程序以确保其正确性是错误的。
如果需要在一个 ArrayList 中插入大量的数据，考虑先使用 ensureCapacity 增加容量，避免大量的扩容操作，可以有效提升插入效率。

## LinkedList class
LinkedList 一个双向的链表，实现了 List 接口和 Deque 接口，可以存储 null 值。
LinkedList 是非线程安全的，如果你需要在多线程环境下使用它，请使用 Collections.synchronizedList 方法。

## Vector class
Vector 类似 ArrayList，它是线程安全的，但是并不推荐使用，推荐使用 ArrayList。

## Stack class
Stack 一个后进先出的栈，从 Vector 类继承，但是并不推荐使用，应优先使用 ArrayDeque。

## Queue interface
Queue 代表了一个队列，从 Collection 继承，除了基本的 Collection 操作外，还提供额外的插入，提取和检查操作。
这些方法中的每一种都以两种形式存在：一种在操作失败时抛出异常，另一种返回特殊值（ null 或 false，具体取决于操作）。
Queue 并不支持插入 null 值，即使有的实现，例如：LinkedList 允许它，但也不应该插入 null 值，因为 poll 方法会返回 null 表示队列中不存在某元素。

## PriorityQueue class
PriorityQueue 一个没有边界的队列，其中的元素按照自然排序或按照 Comparator 进行排序，PriorityQueue 不支持插入 null 值，依赖自然排序的队列也不允许插入一个不能进行排序的对象。
PriorityQueue 不保证元素的迭代顺序（之前不是说有序的吗？这里的有序指的是当调用 poll 方法获取数据时是有序的）。
如果你希望迭代时也是有序的，考虑这样处理：Arrays.sort(pq.toArray())。
PriorityQueue 不是线程安全的，考虑使用线程安全的 PriorityBlockingQueue 类。

## Deque
Deque 代表了一个双端队列，从 Queue 继承，支持有大小限制和没有大小限制的队列。
提供了访问队列两端元素的方法，提供了插入，移除和检查元素的方法。
这些方法中的每一种都以两种形式存在：一种在操作失败时抛出异常，另一种返回特殊值（ null 或 false，具体取决于操作）。
同样不鼓励插入 null 值。

## ArrayDeque
ArrayDeque 一个没有边界的双端队列，禁止插入 null 值，ArrayDeque 不是线程安全的。
作为栈使用时，比 Stack 快。
作为队列使用时，比 LinkedList 快。

## Map
Map 代表了一个将 key 映射到 value 的对象。
key 不能重复，每个 key 最多映射到一个 value。
它替代了老的抽象类 Dictionary。
Map 提供了三个视图，key 集合，value 集合，key-value 集合。
它的实现中 TreeMap 能保证迭代顺序，而 HashMap 不能保证迭代顺序。

## Dictionary
Dictionary 已经被 Map 取代，不建议使用。

## Hashtable
Hashtable 实现了一个哈希表，任何的非 null 对象可以作为 key，作为 key 的对象必须实现 hashCode 和 equals 方法。
Hashtable 有两个性能相关的参数：initial capacity 初始容量，load factor 加载因子。初始容量决定了 Hashtable 在创建时分配的容量（桶的数量）。
加载因子决定了当表中元素数量超过加载因子和当前容量的乘积时，为了减少 hash 碰撞，哈希表将被重新哈希（即，重建内部数据结构）以便哈希表容量增大为原来的两倍。加载因子默认值时 0.75，在时间和空间成本之间提供了良好的权衡。较高的值会减少空间开销，但会增加查找成本。
Hashtable 是线程安全的，但已经不推荐使用，不需要线程安全时使用 HashMap，需要线程安全时使用 ConcurrentHashMap。

## HashMap
HashMap 基于哈希表的 Map 接口的一个实现，基本等同于 Hashtable，主要区别是允许存储 null 值作为 key 和 value。并且是非线程安全的。HashMap 不保证元素的顺序。如果需要线程安全的 HashMap 可以使用 Collections.synchronizedMap 方法去包装它，最好在创建时完成。
当一个桶中链表节点数量超过了 TREEIFY_THRESHOLD = 8 个并且 capacity 大于 MIN_TREEIFY_CAPACITY = 64 个时，则这个桶中的链表将变为一个红黑二叉树，如果节点数量被减少到少于 UNTREEIFY_THRESHOLD = 6 个，则恢复为链表。

## LinkedHashMap
LinkedHashMap 从 HashMap 继承，它维护了一个双向链表，它保证了迭代顺序为插入的顺序。LinkedHashMap 有个特殊的构造函数，你可以提供一个参数，让元素的迭代顺序和元素的访问顺序关联，迭代顺序变为从最近最少 -> 最近。
```
package top.codelab.main;

import java.util.LinkedHashMap;
import java.util.Map;

public class Main {

    public static void main(String[] args) {

        Map<Integer, Character> map = new LinkedHashMap(16, 0.75f, true);
        map.put(1, 'A');
        map.put(2, 'B');
        map.put(3, 'C');
        map.put(4, 'D');

        map.values().forEach(System.out::println);

        map.get(1);
        map.get(2);

        map.values().forEach(System.out::println);
    }
}
```

## IdentityHashMap
IdentityHashMap 类似 HashMap，但在比较键（和值）时使用引用相等性代替对象相等性。换句话说，在IdentityHashMap中，当且仅当（k1 == k2）时，两个密钥 k1 和 k2 被认为是相等的。（在正常的Map实现中（如HashMap），当且仅当（ k1 == null ? k2 == null : k1.equals（ k2 ））时，两个键 k1 和 k2 被认为是相等的。）

## SortedMap
SortedMap 代表了一个支持排序的 Map，元素根据 key 值按照自然排序或按照 Comparator 进行排序。参考 SortedSet。

## NavigableMap
NavigableMap 从 SortedMap 继承，参考 NavigableSet

## TreeMap
TreeMap 一个基于红黑树的 NavigableMap 的实现。非线程安全，需要线程安全可使用 Collections.synchronizedSortedMap 方法进行包装。
