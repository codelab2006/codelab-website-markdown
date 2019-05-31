# 单例模式（Singleton pattern）
> author: Yongjian Huang
> tags: 设计模式, Creational

文章摘要
**********
```
package top.codelab.main;

/**
 * 饿汉式
 * 是否 Lazy 初始化：否
 * 是否多线程安全：是
 */
class Singleton {

    private static Singleton instance = new Singleton();

    private Singleton() {}

    public static Singleton getInstance() {
        return instance;
    }

    public void run() {
        System.out.println("Singleton......");
    }
}

/**
 * 静态内部类式
 * 是否 Lazy 初始化：是
 * 是否多线程安全：是
 */
class Singleton {

    private static class SingletonHolder {
        private static final Singleton instance = new Singleton();
    }

    private Singleton() {}

    public static final Singleton getInstance() {
        return SingletonHolder.instance;
    }

    public void run() {
        System.out.println("Singleton......");
    }
}

/**
 * 枚举
 * 是否 Lazy 初始化：是
 * 是否多线程安全：是
 */
enum Singleton {
    INSTANCE;

    public void run() {
        System.out.println("Singleton......");
    }
}

public class Main {

    public static void main(String[] args) {
        Singleton.INSTANCE.run();
    }
}
```
