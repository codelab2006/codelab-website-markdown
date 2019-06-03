# 迭代器模式（Iterator pattern）
> author: Yongjian Huang
> tags: 设计模式-行为型模式

文章摘要
**********
```
package top.codelab.main;

import java.util.NoSuchElementException;

interface Iterator<E> {

    boolean hasNext();

    E next();
}

public class Main {

    private static Iterator<Integer> range(int start, int end) {
        return new Iterator<Integer>() {
            private int index = start;

            @Override
            public boolean hasNext() {
                return this.index < end;
            }

            @Override
            public Integer next() {
                if (!this.hasNext()) {
                    throw new NoSuchElementException();
                }
                return this.index++;
            }
        };
    }

    public static void main(String[] args) {
        Iterator<Integer> iterator = range(20, 50);
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }

        iterator = range(1, 100);
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}
```
