# 单例模式（Singleton pattern）
> author: Yongjian Huang
> tags: 设计模式-创建型模式

单例模式，当我们需要某个类在整个程序的运行过程中只能有一个实例时使用（注意多个 Classloader 的情况）。
这个唯一的实例的创建可以分为 Lazy 和非 Lazy，两种方式。
在多线程情况下需要考虑线程安全问题。
**********
```
package top.codelab.main;

/**
 * 饿汉式
 * 是否 Lazy 初始化：否
 * 是否多线程安全：是
 */
class HungrySingleton {

    private static HungrySingleton instance = new HungrySingleton();

    private HungrySingleton() {
    }

    static HungrySingleton getInstance() {
        return instance;
    }

    void run() {
        System.out.println("Singleton......");
    }
}

/**
 * 静态内部类式
 * 是否 Lazy 初始化：是
 * 是否多线程安全：是
 */
class StaticInnerClassSingleton {

    private static class SingletonHolder {
        private static StaticInnerClassSingleton instance = new StaticInnerClassSingleton();
    }

    private StaticInnerClassSingleton() {
    }

    static StaticInnerClassSingleton getInstance() {
        return SingletonHolder.instance;
    }

    void run() {
        System.out.println("Singleton......");
    }
}

/**
 * 枚举
 * 是否 Lazy 初始化：是
 * 是否多线程安全：是
 */
enum EnumSingleton {
    INSTANCE;

    public void run() {
        System.out.println("Singleton......");
    }
}

public class Main {

    public static void main(String[] args) {
        HungrySingleton.getInstance().run();
        StaticInnerClassSingleton.getInstance().run();
        EnumSingleton.INSTANCE.run();
    }
}
```
